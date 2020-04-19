from django.shortcuts import render
from rest_framework.response import Response
from .serializers import God_odmoriSerializer,God_odmoriCreateSerializer,ZaposleniSerializer,testsiralizer
from .models import God_odmori,Zaposleni
from rest_framework.generics import (
	ListAPIView,
	RetrieveAPIView,
	UpdateAPIView,
	UpdateAPIView,
	CreateAPIView
	)
from rest_framework import permissions
from rest_framework.mixins import DestroyModelMixin,UpdateModelMixin
from rest_framework.response import Response
from .pagionation import OdmorPagination
from datetime import date,datetime
from rest_framework.response import Response

class GOCreateAPIView(CreateAPIView):
	queryset = God_odmori.objects.all()
	serializer_class = God_odmoriCreateSerializer
	permission_classes = [
		permissions.AllowAny
	]
	
class GOListAPIView(ListAPIView):
	queryset = God_odmori.objects.all().order_by('-id')
	serializer_class = God_odmoriSerializer
	pagination_class = OdmorPagination

class GODetailAPIView(RetrieveAPIView):
	queryset = God_odmori.objects.all()
	serializer_class =God_odmoriSerializer
	permission_classes = [
		permissions.IsAuthenticated
	]

class ZaposleniListAPIView(ListAPIView):
	queryset = Zaposleni.objects.all()
	serializer_class = ZaposleniSerializer

class TaskUpdate(DestroyModelMixin,UpdateModelMixin,RetrieveAPIView):
	queryset = God_odmori.objects.all()
	serializer_class = testsiralizer

	def put(self,request,*args,**kwargs):
		return self.update(request,*args,**kwargs)
		obj = God_odmori.objects.filter(id=kwargs['pk'])

	def delete(self,request,*args,**kwargs):
		return self.destroy(request,*args,**kwargs)
			
