from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from .models import usertable, jobseeker, recruiter, job, application, company, education, experience
from .serializers import usertableSerializer, jobseekerSerializer, recruiterSerializer, jobSerializer, applicationSerializer, companySerializer, educationSerializer, experienceSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
from django.contrib.sessions.middleware import SessionMiddleware
from django.middleware.csrf import get_token
import logging
from django.core.files.storage import FileSystemStorage
from rest_framework.decorators import action


class usertableViewSet(viewsets.ModelViewSet):
    queryset = usertable.objects.all()
    serializer_class = usertableSerializer

class jobseekerViewSet(viewsets.ModelViewSet):
    queryset = jobseeker.objects.all()
    serializer_class = jobseekerSerializer

class recruiterViewSet(viewsets.ModelViewSet):
    queryset = recruiter.objects.all()
    serializer_class = recruiterSerializer

class jobViewSet(viewsets.ModelViewSet):
    queryset = job.objects.all()
    serializer_class = jobSerializer


    def get_queryset(self):
        queryset = super().get_queryset()
        max_likes = self.request.query_params.get('max_likes', None)
        if max_likes:
            queryset = queryset.order_by('-like_count')[:int(max_likes)]
        return queryset
    

from django.core.mail import send_mail
class applicationViewSet(viewsets.ModelViewSet):
    queryset = application.objects.all()
    serializer_class = applicationSerializer

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        try:
            application = self.get_object()
            new_status = request.data.get('status')
            application.status = new_status
            application.save()
            serializer = self.get_serializer(application)
            
            if new_status == 'Rejected':
                self.send_rejection_email(application)

            if new_status == 'Hired':
                self.send_accepting_email(application)

            return Response(serializer.data)
        except application.DoesNotExist:
            return Response({'error': 'Application not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def send_rejection_email(self, application):
        subject = 'Application Status Update'
        message = f'Dear Applicant,\n\nWe regret to inform you that your application for {application.job.job_title} has been rejected.\n\nBest regards,\nJobStack'
        recipient_list = [application.email]
        send_mail(subject, message, 'your_email@example.com', recipient_list)

    def send_accepting_email(self,application):
        subject = 'Application Status Update'
        message= f'Dear Applicant,\n\nCongragulations!,\nyou are hired for the position {application.job.job_title}.\n\nIt might take some time to get the confirmation from the recruiter side.\nPlease be sure to keep an eye on your email for updates.\n\nBest regards,\nJobStack'
        recipient_list = [application.email]
        send_mail(subject, message, 'your_email@example.com', recipient_list)



class companyViewSet(viewsets.ModelViewSet):
    queryset = company.objects.all()
    serializer_class = companySerializer

class experienceViewSet(viewsets.ModelViewSet):
    queryset = experience.objects.all()
    serializer_class = experienceSerializer

class educationViewSet(viewsets.ModelViewSet):
    queryset = education.objects.all()
    serializer_class = educationSerializer


from django.views.decorators.csrf import csrf_exempt


"""to login"""
@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        data = request.data
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=400)
        user = authenticate(request, email=email, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            csrf_token = get_token(request)  # Get CSRF token
            return Response({'token': token.key, 'csrf_token': csrf_token})
    return Response({'error': 'Invalid Credentials'}, status=400)



"""to logout"""
@api_view(['POST'])  # Use POST method for logging out
# @permission_classes([IsAuthenticated])
def logout(request):
    if request.method == 'POST':                                                                #signing out
        request.user.auth_token.delete()  # Delete the user's auth token
        return Response({'message': 'Logout successful'})
    return Response({'error': 'Invalid request method'}, status=400)
    

"""to register new user"""
class RegisterView(APIView):                                                                 # for registering
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""to get user type and route accordingly"""
@api_view(['POST'])
def get_usertype(request):
    try:
        email = request.data.get('email')
        user = usertable.objects.get(email=email)
        usertype = user.usertype
        return Response({'usertype': usertype}, status=status.HTTP_200_OK)
    except usertable.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    


"""to search for jobs"""
class SearchView(APIView):
    def get(self, request, format=None):
        # Get search parameters from the request
        job_title = request.query_params.get('job_title', None)
        location = request.query_params.get('location', None)                       #for searching Job
        industry = request.query_params.get('industry', None)
        # Filter the queryset based on the search parameters
        jobs = job.objects.all()
        if job_title:
            jobs = jobs.filter(job_title__icontains=job_title)
        if location:
            jobs = jobs.filter(location__icontains=location)
        if industry:
            jobs = jobs.filter(industry__icontains=industry)
        
        serializer = jobSerializer(jobs, many=True)
        return Response(serializer.data)


"""to search for company"""
class CompanySearchView(APIView):
    def get(self, request, format=None):
        name = request.query_params.get('name', None)
        headquarters = request.query_params.get('headquarters', None)
        industry = request.query_params.get('industry', None)
        companies = company.objects.all()
        if name:
            companies = companies.filter(name__icontains=name)
        if headquarters:
            companies = companies.filter(headquarters__icontains=headquarters)
        if industry:
            companies = companies.filter(industry__icontains=industry)
            
        print("hello ")
        serializer = companySerializer(companies, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




#JobDetail View 
class JobDetailView(RetrieveAPIView):
    queryset = job.objects.all()
    serializer_class = jobSerializer
    lookup_field = 'id'

# company detail
class CompanyDetailView(RetrieveAPIView):
    queryset = company.objects.all()
    serializer_class = companySerializer
    lookup_field = 'id'


"""to check login status"""
@api_view(['GET'])
def check_login_status(request):
    if request.user.is_authenticated:
        return Response({'status': 'logged_in'}, status=status.HTTP_200_OK)
    else:
        return Response({'status': 'not_logged_in'}, status=status.HTTP_401_UNAUTHORIZED)
    



"""to store resume and application"""
from django.core.files.storage import FileSystemStorage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import os
import logging
from django.conf import settings


logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_application(request):
    job_id = request.data.get('job_id')
    email = request.data.get('email')
    remarks = request.data.get('remarks')
    resume = request.FILES.get('resume')

    logger.info(f'Received data - job_id: {job_id}, email: {email}, remarks: {remarks}, resume: {resume}')

    if not remarks or not resume:
        logger.error('Missing required fields.')
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        fs = FileSystemStorage(location=settings.MEDIA_ROOT)
        resume_name = fs.save(resume.name, resume)
        resume_path = fs.url(resume_name)
    except Exception as e:
        logger.error(f'Error saving resume: {e}')
        return Response({'error': 'Error saving resume.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        # Save the application
        application_instance = application(
            job_id=job_id,
            email=email,
            resume_path=resume_path,
            remarks=remarks,
            status='Applied'
        )
        application_instance.save()

        #email
        job = application_instance.job
        recruiter_email = job.recruiter.user.email
        send_recruiter_email(job.job_title, recruiter_email, email)

        send_jobseeker_email(email, job.job_title)

    except Exception as e:
        logger.error(f'Error saving application: {e}')
        return Response({'error': 'Error saving application.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    logger.info('Application submitted successfully.')
    return Response({'message': 'Application submitted successfully.'}, status=status.HTTP_201_CREATED)

def send_recruiter_email(job_title, recruiter_email, applicant_email):
    subject = 'New Application Recorded'
    message = f'Dear Recruiter,\n\nA new application has been submitted for the position of {job_title}.\n\nApplicant Email: {applicant_email}.\n\nLogin into your account to see the application and start hiring. \n\n\nRegards,\nJobStack'
    send_mail(subject, message, 'noreplyjobstack@gmail.com', [recruiter_email])

def send_jobseeker_email(jobseeker_email, job_title):
    subject = 'A New Application Received'
    message = f'Dear Applicant,\n\nYour application for the position of {job_title} has been recorded.\n\nAll the very best!\n\nRegards,\nJobStack'
    send_mail(subject, message, 'noreplyjobstack@gmail.com', [jobseeker_email])


"""to fetch userdetails"""
@api_view(['POST'])
def get_userdetails(request):
    email = request.data.get('email')
    try:
        user = usertable.objects.get(email=email)
        user_details = {
            'id': user.id,
            'usertype': user.usertype,
        }
        return Response(user_details, status=status.HTTP_200_OK)
    except usertable.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    

"""to view application status gotta edit it; job id is visible"""
class applicationstatus(APIView):
    def get(self, request, email):
        applications = application.objects.filter(email=email)
        serializer = applicationSerializer(applications, many=True)
        return Response(serializer.data)


"""fetch user id using for profile setup"""
def get_user_id(request):
    email = request.GET.get('email')
    try:
        user = usertable.objects.get(email=email)
        return JsonResponse({'userId': user.id})
    except usertable.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)


"""fetch user id in jobseeker table using for profile setup"""
def get_jobseeker_id(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'error': 'Email parameter is missing'}, status=400)
    try:
        user = usertable.objects.get(email=email)
        js = jobseeker.objects.get(user=user)
        return JsonResponse({'jobseekerId': js.id})
    except usertable.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except jobseeker.DoesNotExist:
        return JsonResponse({'error': 'Jobseeker not found'}, status=404)



"""JS personal info setup for profile setup"""
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@csrf_exempt
def save_jobseeker(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            user = usertable.objects.get(id=data['user'])
            
            # Ensure fresher value is 'Y' or 'N'
            fresher = 'Y' if data.get('isFresher', False) else 'N'

            js, created = jobseeker.objects.update_or_create(
                user=user,
            
                defaults={
                    'name': data.get('firstName', ''),
                    'lname': data.get('lastName', ''),
                    'contact_no': data.get('contactNumber', ''),
                    'location': data.get('location', ''),
                    'description': data.get('description', ''),
                    'fresher': fresher,
                    'gender': data.get('gender', ''),
                    'dob': data.get('dob', None)
                }
            )
            return JsonResponse({'message': 'Jobseeker saved successfully', 'jobseekerId': js.id})
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {e}'}, status=400)
        except usertable.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)  # Catch all other exceptions
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def save_education(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            js = jobseeker.objects.get(id=data['job_seeker'])

            edu, created = education.objects.update_or_create(
                job_seeker=js,
                defaults={
                    'education_level': data.get('educationLevel', ''),
                    'field_of_study': data.get('fieldOfStudy', ''),
                    'status': data.get('status', ''),
                    'institution': data.get('institution', ''),
                    'start_date': data.get('startDate', None),
                    'end_date': data.get('endDate', None),
                    'grade': data.get('grade', '')
                }
            )
            return JsonResponse({'message': 'Education saved successfully', 'educationId': edu.id})
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {e}'}, status=400)
        except jobseeker.DoesNotExist:
            return JsonResponse({'error': 'JobSeeker not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)

@csrf_exempt
def save_experience(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            js = jobseeker.objects.get(id=data['job_seeker'])

            exp, created = experience.objects.update_or_create(
                job_seeker=js,
                defaults={
                    'job_title': data.get('jobTitle', ''),
                    'company': data.get('company', ''),
                    'location': data.get('location', ''),
                    'start_date': data.get('startDate', None),
                    'end_date': data.get('endDate', None),
                    'responsibilities': data.get('responsibilities', ''),
                    'description': data.get('description', '')
                }
            )
            return JsonResponse({'message': 'Experience saved successfully', 'experienceId': exp.id})
        except KeyError as e:
            return JsonResponse({'error': f'Missing field: {e}'}, status=400)
        except jobseeker.DoesNotExist:
            return JsonResponse({'error': 'JobSeeker not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)




#-------------------------------------------------------------------------------------------------------------------



"""to post Job"""
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.dateparse import parse_date
import json

def get_recruiter_by_email(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'error': 'Email parameter is missing'}, status=400)
    try:
        user = usertable.objects.get(email=email)
        rec = recruiter.objects.get(user=user)
        return JsonResponse({'id': rec.id})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except recruiter.DoesNotExist:
        return JsonResponse({'error': 'Recruiter not found'}, status=404)

def get_company_by_recruiter_id(request):
    recruiter_id = request.GET.get('recruiter_id')
    if not recruiter_id:
        return JsonResponse({'error': 'Recruiter ID parameter is missing'}, status=400)

    try:
        comp = company.objects.get(recruiter__id=recruiter_id)
        return JsonResponse({'id': comp.id})
    except company.DoesNotExist:
        return JsonResponse({'error': 'Company not found'}, status=404)

@csrf_exempt
def create_job(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        try:
            rec = recruiter.objects.get(id=data['recruiter'])
            comp = company.objects.get(id=data['company'])

            jobdata = job(
                job_title=data['jobTitle'],
                job_description=data['jobDescription'],
                industry=data['industry'],
                location=data['location'],
                jobpost_date=parse_date(data['jobPostDate']),
                last_date=parse_date(data['lastDate']),
                employment_type=data['employmentType'],
                recruiter=rec,
                company_id=comp,
            )
            jobdata.save()
            return JsonResponse({'message': 'Job posted successfully'})
        except recruiter.DoesNotExist:
            return JsonResponse({'error': 'Recruiter not found'}, status=404)
        except company.DoesNotExist:
            return JsonResponse({'error': 'Company not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

from rest_framework import generics






"""jobs posted by rec"""
class JobsByUserAPIView(generics.ListAPIView):
    serializer_class = jobSerializer

    def get_queryset(self):
        recruiter_id = self.request.query_params.get('recruiterId')
        if recruiter_id:
            return job.objects.filter(recruiter_id=recruiter_id)
        return job.objects.none()
    




"""to display applications for a particular job"""

class ApplicationsByJobAPIView(generics.ListAPIView):
    serializer_class = applicationSerializer

    def get_queryset(self):
        job_id = self.kwargs['job_id']
        return application.objects.filter(job_id=job_id)
    


"""rec profile form"""
@api_view(['POST'])
def save_recruiter(request):
    try:
        recruiter_id = request.data.get('id')
        rec = recruiter.objects.get(id=recruiter_id)
        serializer = recruiterSerializer(instance=rec, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except recruiter.DoesNotExist:
        return Response({'error': 'Recruiter not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def save_company(request):
    serializer = companySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




