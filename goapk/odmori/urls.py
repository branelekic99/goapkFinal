from django.urls import path
from .views import (
    GOCreateAPIView,
    GOListAPIView,
    GODetailAPIView,
    ZaposleniListAPIView,
    TaskUpdate,
)

urlpatterns = [
    path('create/',GOCreateAPIView.as_view()),
    path('detail/<str:pk>/',GODetailAPIView.as_view()),
    path('update/<str:pk>/',TaskUpdate.as_view()),
    path("list/",GOListAPIView.as_view()),
    path('zaposleni/',ZaposleniListAPIView.as_view())
]
