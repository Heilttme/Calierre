# Generated by Django 4.0.6 on 2022-12-16 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='letteruser',
            name='aboltus',
            field=models.CharField(max_length=12, null=True),
        ),
    ]
