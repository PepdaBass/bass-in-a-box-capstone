# Generated by Django 4.0.3 on 2022-03-22 01:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('customers', '0002_remove_customer_box_plan_category_customer_box_plan_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Credit_Card_Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cc_type', models.CharField(max_length=30)),
                ('cc_number', models.IntegerField(max_length=16)),
                ('cc_exp_date', models.CharField(max_length=5)),
                ('cc_cvv', models.IntegerField(max_length=3)),
                ('cc_full_name', models.CharField(max_length=30)),
                ('is_valid', models.BooleanField()),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='customers.customer')),
            ],
        ),
    ]
