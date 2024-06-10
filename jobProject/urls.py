
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from jobApp.views import login,RegisterView
from jobApp.views import usertableViewSet, jobseekerViewSet, recruiterViewSet, jobViewSet, applicationViewSet, companyViewSet,experienceViewSet, educationViewSet
from jobApp.views import GetUserTypeView
from jobApp.views import SearchView
from jobApp.views import JobDetailView


router = DefaultRouter()
router.register(r'usertable', usertableViewSet)
router.register(r'jobseeker', jobseekerViewSet)
router.register(r'recruiters', recruiterViewSet)
router.register(r'job', jobViewSet)
router.register(r'application', applicationViewSet)
router.register(r'company', companyViewSet)
router.register(r'experience',experienceViewSet)
router.register(r'education',educationViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', include(router.urls)),
    path('api/login/', login, name='login'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/get_usertype/', GetUserTypeView.as_view(), name='get_usertype'),
    path('api/search/', SearchView.as_view(), name='search'),
    path('viewapply/<int:id>/', JobDetailView.as_view(), name='job-detail'),
]


