# Generated by Django 2.1.7 on 2019-04-17 06:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('admin', '0003_logentry_add_action_flag_choices'),
        ('games', '0003_user'),
    ]

    operations = [

        migrations.DeleteModel(
            name='User',
        ),
    ]