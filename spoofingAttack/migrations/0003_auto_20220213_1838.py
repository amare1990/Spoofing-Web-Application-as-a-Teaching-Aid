# Generated by Django 2.2.7 on 2022-02-13 18:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('spoofingAttack', '0002_auto_20220213_1837'),
    ]

    operations = [
        migrations.AlterField(
            model_name='credential',
            name='email',
            field=models.CharField(max_length=200),
        ),
    ]
