from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
import logging
logger = logging.getLogger(__name__)

class CustomEmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        logger.debug(f"Authenticating user: {email}")
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            logger.debug("User does not exist")
            return None
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                logger.debug("Authentication successful")
                return user
            logger.debug("Authentication failed")
        return None