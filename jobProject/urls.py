
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
from jobApp.views import get_user_id, get_jobseeker_id
from jobApp.views import get_recruiter_by_email, get_company_by_recruiter_id,create_job
from jobApp.views import JobsByUserAPIView
from jobApp.views import ApplicationsByJobAPIView
from jobApp.views import save_jobseeker, save_education, save_experience

from jobApp.views import save_recruiter, save_company




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

    path('api/get-user-id', get_user_id, name='get-user-id'),

    path('api/jobseekerid', get_jobseeker_id, name='get_jobseeker_id'),

    path('api/save_jobseeker', save_jobseeker, name='save_jobseeker'),
    path('api/save_education', save_education, name='save_education'),
    path('api/save_experience', save_experience, name='save_experience'),


    path('api/recruiters', get_recruiter_by_email,name='get_recruiter_by_email'),
    path('api/companies', get_company_by_recruiter_id,name='get_company_by_recruiter_id'),
    path('api/jobs', create_job,name='create_job'),
    path('api/jobsbyuser', JobsByUserAPIView.as_view(), name='jobs_by_user'),
    path('api/applications/job/<int:job_id>', ApplicationsByJobAPIView.as_view(), name='job-applications'),

    path('api/save_recruiter/', save_recruiter, name='save_recruiter'),
    path('api/save_company/', save_company, name='save_company'),

]



