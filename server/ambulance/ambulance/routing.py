from django.urls import path  # new
from channels.auth import AuthMiddlewareStack  # new
from channels.routing import ProtocolTypeRouter,URLRouter  

from trips.consumers import AmbulanceConsumer

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter([
            path('ambulance/', AmbulanceConsumer),
        ])
    )
})