# Generated by Django 4.0.3 on 2023-01-01 15:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0008_alter_letteruser_options_letteruser_date_joined_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='letteruser',
            name='username',
            field=models.CharField(max_length=15),
        ),
    ]
