# Generated by Django 3.2 on 2024-07-03 12:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='jobpost_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
