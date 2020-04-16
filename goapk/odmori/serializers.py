from rest_framework import serializers
from rest_framework.mixins import DestroyModelMixin,UpdateModelMixin
from . models import Zaposleni,God_odmori
import json

class God_odmoriCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = God_odmori
		fields = ['id','zaposleni','poc_odmora','kraj_odmora','prvi_radni_dan','prilog']

class ZaposleniSerializer(serializers.ModelSerializer):
	class Meta:
		model = Zaposleni
		fields = "__all__"
class ZaposleninazivSErilaizer(serializers.ModelSerializer):
	class Meta:
		model = Zaposleni
		fields = ['ime','prezime']
		
class God_odmoriSerializer(serializers.ModelSerializer):
	zaposleni = serializers.CharField()
	class Meta:
		model = God_odmori
		fields =['id','zaposleni','poc_odmora','kraj_odmora','prvi_radni_dan','status_zahtjeva','odobrio','prilog']

class testsiralizer(serializers.ModelSerializer):
	zaposleni = serializers.SerializerMethodField()

	def get_zaposleni(self,obj):
		return str(obj.zaposleni)
	class Meta:
		model = God_odmori
		fields=('id','zaposleni','poc_odmora','kraj_odmora','prvi_radni_dan','status_zahtjeva','odobrio','prilog')
