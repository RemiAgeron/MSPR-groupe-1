# Generated by Django 4.1.6 on 2023-02-13 21:00

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('A_rosa_je_site', '0002_remove_post_date_remove_review_address_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='created_at',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 2, 13, 21, 0, 53, 144575)),
        ),
        migrations.AlterField(
            model_name='message',
            name='created_at',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 2, 13, 21, 0, 53, 144350)),
        ),
        migrations.AlterField(
            model_name='post',
            name='created_at',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 2, 13, 21, 0, 53, 146189)),
        ),
        migrations.AlterField(
            model_name='review',
            name='created_at',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 2, 13, 21, 0, 53, 145013)),
        ),
        migrations.AlterField(
            model_name='user',
            name='created_at',
            field=models.DateField(blank=True, default=datetime.datetime(2023, 2, 13, 21, 0, 53, 143783)),
        ),
        migrations.AlterField(
            model_name='user',
            name='user_picture',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]