# Generated by Django 3.0.5 on 2020-04-19 14:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('odmori', '0003_remove_god_odmori_status_zahtjeva'),
    ]

    operations = [
        migrations.AddField(
            model_name='god_odmori',
            name='status_zahteva',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='odmori.StatusTable'),
        ),
    ]
