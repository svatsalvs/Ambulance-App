from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.test import Client
from channels.db import database_sync_to_async
from channels.layers import get_channel_layer
from channels.testing import WebsocketCommunicator
from nose.tools import assert_equal, assert_is_none, assert_is_not_none, assert_true
import pytest

from taxi.routing import application
from trips.models import Trip


TEST_CHANNEL_LAYERS = {
	'default': {
		'BACKEND': 'channels.layers.InMemoryChannelLayer',
	},
}


@database_sync_to_async
def create_user(
	*,
	username='rider@example.com',
	password='pAssw0rd!',
	group='rider'
):
	# Create user.
	user = get_user_model().objects.create_user(
		username=username,
		password=password
	)

	# Create user group.
	user_group, _ = Group.objects.get_or_create(name=group)
	user.groups.add(user_group)
	user.save()
	return user


@pytest.mark.asyncio
@pytest.mark.django_db(transaction=True)
class TestWebsockets:

	async def test_authorized_user_can_connect(self, settings):
		# Use in-memory channel layers for testing.
	    settings.CHANNEL_LAYERS = TEST_CHANNEL_LAYERS

	    user = await create_user(
	        username='rider@example.com',
	        group='rider'
	    )
	    communicator = await auth_connect(user)
	    await communicator.disconnect()

	async def test_rider_can_create_trips(self, settings):
		settings.CHANNEL_LAYERS = TEST_CHANNEL_LAYERS

		user = await create_user(
			username='rider@example.com',
			group='rider'
		)
		communicator = await auth_connect(user)

		# Send JSON message to server.
		await communicator.send_json_to({
			'type': 'create.trip',
			'data': {
				'pick_up_address': 'A',
				'drop_off_address': 'B',
				'rider': user.id,
			}
		})

		# Receive JSON message from server.
		response = await communicator.receive_json_from()
		data = response.get('data')

		# Confirm data.
		assert_is_not_none(data['id'])
		assert_equal('A', data['pick_up_address'])
		assert_equal('B', data['drop_off_address'])
		assert_equal(Trip.REQUESTED, data['status'])
		assert_is_none(data['driver'])
		assert_equal(user.username, data['rider'].get('username'))

		await communicator.disconnect()

async def auth_connect(user):
    # Force authentication to get session ID.
    client = Client()
    client.force_login(user=user)

    # Pass session ID in headers to authenticate.
    communicator = WebsocketCommunicator(
        application=application,
        path='/taxi/',
        headers=[(
            b'cookie',
            f'sessionid={client.cookies["sessionid"].value}'.encode('ascii')
        )]
    )
    connected, _ = await communicator.connect()
    assert_true(connected)
    return communicator