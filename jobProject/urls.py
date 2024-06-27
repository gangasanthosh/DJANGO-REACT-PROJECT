
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from jobApp.views import RegisterView
from jobApp.views import usertableViewSet, jobseekerViewSet, recruiterViewSet, jobViewSet, applicationViewSet, companyViewSet,experienceViewSet, educationViewSet
from jobApp.views import login
from jobApp.views import get_usertype
from jobApp.views import check_login_status
from jobApp.views import SearchView
from jobApp.views import JobDetailView
from jobApp.views import CompanyDetailView
from jobApp.views import logout
from jobApp.views import submit_application
from jobApp.views import CompanySearchView
from jobApp.views import get_userdetails
from jobApp.views import applicationstatus

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
    path('api/logout/', logout, name='logout'),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/get_usertype/', get_usertype, name='get_usertype'),
    path('api/search/', SearchView.as_view(), name='search'),
    path("api/company/search", CompanySearchView.as_view(), name="company-search"),
    path('viewapply/<int:id>/', JobDetailView.as_view(), name='job-detail'),
    path('company/<int:id>/', CompanyDetailView.as_view(), name='company-detail'),
    path('api/check_login_status', check_login_status, name='check_login_status'),
    path('api/submit_application', submit_application, name='submit_application'),
    path('api/get_userdetails/', get_userdetails, name='get_userdetails'),
    path('api/applications/<str:email>/', applicationstatus.as_view(), name='application-list'),
    path('api/job/<int:id>/',JobDetailView.as_view(),name='job-detail'),
]



