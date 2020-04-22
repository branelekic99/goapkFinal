from rest_framework import serializers
from rest_framework.mixins import DestroyModelMixin,UpdateModelMixin
from . models import Zaposleni,God_odmori
from django.core.mail import send_mail

class God_odmoriCreateSerializer(serializers.ModelSerializer):
	class Meta:
		model = God_odmori
		fields = ['id','zaposleni','poc_odmora','kraj_odmora','prvi_radni_dan','prilog']

	def create(self,validated_data):
		zaposleni = validated_data['zaposleni'].ime +" " + validated_data['zaposleni'].prezime
		obj = God_odmori.objects.create(**validated_data)
		id = obj.id
		url = "http://localhost:3000/detail/"+str(id)
		send_mail("Zahtjev godisnjeg odmora",
			url,
			'branislavtestsender@outlook.com',
			['branislavtestsender@outlook.com'],fail_silently=False)
		return obj

class ZaposleniSerializer(serializers.ModelSerializer):
	class Meta:
		model = Zaposleni
		fields = "__all__"
		
class God_odmoriSerializer(serializers.ModelSerializer):
	zaposleni = serializers.CharField()
	status_zahteva = serializers.CharField()
	class Meta:
		model = God_odmori
		fields =['id','zaposleni','poc_odmora','kraj_odmora','prvi_radni_dan','status_zahteva','odobrio','prilog']

class UpdateDestorySerializer(serializers.ModelSerializer):
	zaposleni = serializers.SerializerMethodField()

	def get_zaposleni(self,obj):
		return str(obj.zaposleni)
	class Meta:
		model = God_odmori
		fields=('id','zaposleni','poc_odmora','kraj_odmora','prvi_radni_dan','status_zahteva','odobrio','prilog')
