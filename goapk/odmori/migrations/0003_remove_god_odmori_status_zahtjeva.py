# Generated by Django 3.0.5 on 2020-04-19 14:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('odmori', '0002_statustable'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='god_odmori',
            name='status_zahtjeva',
        ),
    ]
