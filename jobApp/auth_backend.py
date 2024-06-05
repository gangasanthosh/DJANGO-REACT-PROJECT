from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
import logging



logger = logging.getLogger(__name__)

class CustomEmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None,**kwargs):
        UserModel = get_user_model()
        try:
            user = get_user_model().objects.get(email=email)
        except get_user_model().DoesNotExist:
            logger.error(f"Authentication failed: No user found with email {email}")
            return None
        else:
            if user.check_password(password):
                return user
            else:
                logger.error(f"Authentication failed: Incorrect password for user {email}")
        print("User information")
        return None
