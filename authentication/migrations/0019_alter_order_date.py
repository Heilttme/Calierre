# Generated by Django 4.1.5 on 2023-01-23 19:04

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0018_alter_order_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2023, 1, 23, 22, 4, 45, 768840), null=True),
        ),
    ]
