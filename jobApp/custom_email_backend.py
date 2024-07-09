# custom_email_backend.py

from django.core.mail.backends.smtp import EmailBackend

class CustomEmailBackend(EmailBackend):
    def _starttls(self):
        self.connection.starttls()
