# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.contrib.auth.hashers import make_password
# from .models import usertable, registereduser

# @receiver(post_save, sender=usertable)
# def create_registered_user(sender, instance, created, **kwargs):
#     if created:
#         registereduser.objects.create(
#             user=instance,
#             username=instance.email,  # Assuming you want to use the email as the username
#         )
