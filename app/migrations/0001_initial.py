# Generated by Django 3.2.6 on 2021-08-17 03:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mp',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=100)),
                ('image', models.TextField(default=None)),
                ('url', models.TextField(default=None)),
                ('rank', models.IntegerField(default=None)),
            ],
        ),
    ]
