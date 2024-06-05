from django.apps import AppConfig


class JobappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'jobApp'

    def ready(self):
        import jobApp.signals  # Import the signals module
