from django.db import models
from django.db.models.signals import post_save,pre_save
from django.core.mail import send_mail

STATUS = (
	("Planiran","Planiran"),
	("Usaglasen","Usaglasen"),
	("Potvrdjen","Potvrdjen"),
)

class Zaposleni(models.Model):
	ime = models.CharField(max_length=30)
	prezime = models.CharField(max_length=30)
	br_dana_go = models.IntegerField()
	br_neiskoristenih_dana = models.IntegerField()

	def __str__(self):
		return self.ime +' '+self.prezime

class God_odmori(models.Model):
	zaposleni = models.ForeignKey(Zaposleni,on_delete=models.CASCADE)
	poc_odmora = models.DateField()
	kraj_odmora = models.DateField()
	prvi_radni_dan = models.DateField()
	status_zahtjeva = models.CharField(max_length=30,choices=STATUS,default="Planiran")
	odobrio = models.CharField(max_length=40,default='admin')
	prilog = models.FileField(upload_to ='prilog',blank=True)

	def save(self,*args,**kwargs):
		super(God_odmori,self).save(*args,**kwargs)

# def god_odmori_emailSend(sender,instance,**kwargs):
# 	zaposleni = instance.zaposleni.ime + " " + instance.zaposleni.prezime
# 	url = "http://localhost:3000/detail/"+str(instance.id)
# 	send_mail("Zahtjev godisnjeg odmora",
# 		url,
# 		'branislavsteamacc@outlook.com',
# 		['branisalekic@hotmail.com'],fail_silently=False)


# post_save.connect(god_odmori_emailSend,sender=God_odmori)

# Create your models here.
