from django.urls import path
from .views import (
    GOCreateAPIView,
    GOListAPIView,
    GODetailAPIView,
    ZaposleniListAPIView,
    TaskUpdate,
)

urlpatterns = [
    path('odmor/create/',GOCreateAPIView.as_view()),
    path('odmor/detail/<str:pk>/',GODetailAPIView.as_view()),
    path('odmor/update/<str:pk>/',TaskUpdate.as_view()),
    path("odmor/list/",GOListAPIView.as_view()),
    path('zaposleni/',ZaposleniListAPIView.as_view())
]
