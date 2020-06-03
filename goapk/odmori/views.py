from django.shortcuts import render
from rest_framework.response import Response
from .serializers import God_odmoriSerializer,God_odmoriCreateSerializer,ZaposleniSerializer,UpdateDestorySerializer
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
from .pagionation import OdmorPagination, OdmorZaposleniPagination
from datetime import date,datetime
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework import status

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
	filter_backends = (DjangoFilterBackend,OrderingFilter)
	filter_fields =('status_zahteva',)
	ordering_fields = ('status_zahteva','poc_odmora','kraj_odmora','prvi_radni_dan','status_zahteva')

class GODetailAPIView(RetrieveAPIView):
	queryset = God_odmori.objects.all()
	serializer_class =God_odmoriSerializer

class ZaposleniListAPIView(ListAPIView):
	queryset = Zaposleni.objects.all()
	serializer_class = ZaposleniSerializer
	pagination_class = OdmorZaposleniPagination


class TaskUpdate(DestroyModelMixin,UpdateModelMixin,RetrieveAPIView):
	queryset = God_odmori.objects.all()
	serializer_class = UpdateDestorySerializer

	def put(self,request,*args,**kwargs):
		serializer = UpdateDestorySerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		data = serializer.validated_data
		status_zahteva = data['status_zahteva']
		god_odmor = God_odmori.objects.get(id=kwargs['pk'])
		if(status_zahteva.id<god_odmor.status_zahteva.id or status_zahteva.id>god_odmor.status_zahteva.id+1):
			return Response(
					{'detail':"Nedozvoljena operacija"},
					status=status.HTTP_400_BAD_REQUEST
				)
		if(status_zahteva.id==3):
			pocetak_odmora = data['poc_odmora']
			kraj_odmora = data['kraj_odmora']
			razlika = kraj_odmora-pocetak_odmora
			if(int(razlika.days)>god_odmor.zaposleni.br_neiskoristenih_dana):
				return Response(
					{'detail':"Nema dovoljno slobodnih dana"},
					status=status.HTTP_400_BAD_REQUEST
				)
			else:
				zaposleni_instance = Zaposleni.objects.get(id=god_odmor.zaposleni.id)
				br_data= zaposleni_instance.br_neiskoristenih_dana
				zaposleni_instance.br_neiskoristenih_dana = br_data-int(razlika.days)
				zaposleni_instance.save()
		return self.update(request,*args,**kwargs)
		obj = God_odmori.objects.filter(id=kwargs['pk'])

	def delete(self,request,*args,**kwargs):
		return self.destroy(request,*args,**kwargs)
			
