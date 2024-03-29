# Generated by Django 5.0.1 on 2024-01-17 14:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserBankRelationship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bank', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.bank')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.user')),
            ],
        ),
    ]
