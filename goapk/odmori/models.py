from django.db import models
from django.core.mail import send_mail

class Zaposleni(models.Model):
	ime = models.CharField(max_length=30)
	prezime = models.CharField(max_length=30)
	br_dana_go = models.IntegerField()
	br_neiskoristenih_dana = models.IntegerField()

	def __str__(self):
		return self.ime +' '+self.prezime

class StatusTable(models.Model):
	status = models.CharField(max_length=20)

	def __str__(self):
	 	return self.status

DEFAULT_STATUS = 1
class God_odmori(models.Model):
	zaposleni = models.ForeignKey(Zaposleni,on_delete=models.CASCADE)
	poc_odmora = models.DateField()
	kraj_odmora = models.DateField()
	prvi_radni_dan = models.DateField()
	status_zahteva = models.ForeignKey(StatusTable,on_delete=models.DO_NOTHING,default=DEFAULT_STATUS)
	odobrio = models.CharField(max_length=40,default='admin')
	prilog = models.FileField(upload_to ='prilog',blank=True)

	def save(self,*args,**kwargs):
		super(God_odmori,self).save(*args,**kwargs)


# Create your models here.
