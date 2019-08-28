from django.urls import path

from .views import TripView


app_name = 'ambulance'

urlpatterns = [
    path('', TripView.as_view({'get': 'list'}), name='trip_list'),
    path('<uuid:trip_id>/', TripView.as_view({'get': 'retrieve'}), name='trip_detail'),  # new
]