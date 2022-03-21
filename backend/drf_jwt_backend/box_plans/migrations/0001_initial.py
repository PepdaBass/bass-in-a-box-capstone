# Generated by Django 4.0.3 on 2022-03-21 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Box_Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=30)),
                ('sub_category', models.CharField(max_length=30)),
                ('annual_price', models.IntegerField()),
                ('price_per_box', models.IntegerField()),
                ('contents', models.CharField(max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='Self_Teach_Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=30)),
                ('sub_category', models.CharField(max_length=30)),
                ('annual_price', models.IntegerField()),
                ('price_per_month', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Total_Beginner_Package',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=30)),
                ('sub_category', models.CharField(max_length=30)),
                ('price', models.IntegerField()),
                ('contents', models.CharField(max_length=250)),
            ],
        ),
    ]