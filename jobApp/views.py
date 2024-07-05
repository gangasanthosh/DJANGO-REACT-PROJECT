#from django.shortcuts import render, get_object_or_404
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

class applicationViewSet(viewsets.ModelViewSet):
    queryset = application.objects.all()
    serializer_class = applicationSerializer

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
logger = logging.getLogger(__name__)

RESUMES_DIR = 'frontend/src/resume'        #relative path

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # Uncomment this when you have authentication in place
def submit_application(request):
    job_id = request.data.get('job_id')
    email = request.data.get('email')
    remarks = request.data.get('remarks')
    resume = request.FILES.get('resume')

    logger.info(f'Received data - job_id: {job_id}, email: {email}, remarks: {remarks}, resume: {resume}')

    # Check for missing required fields
    if not remarks or not resume:
        logger.error('Missing required fields.')
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Ensure the resumes directory exists
        os.makedirs(RESUMES_DIR, exist_ok=True)
        fs = FileSystemStorage(location=RESUMES_DIR)
        resume_name = fs.save(resume.name, resume)
        resume_path = fs.path(resume_name)
    except Exception as e:
        logger.error(f'Error saving resume: {e}')
        return Response({'error': 'Error saving resume.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        # Save the application instance
        application_instance = application(
            job_id=job_id,
            email=email,
            resume_path=resume_path,
            remarks=remarks,
            status='applied'
        )
        application_instance.save()
    except Exception as e:
        logger.error(f'Error saving application: {e}')
        return Response({'error': 'Error saving application.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    logger.info('Application submitted successfully.')
    return Response({'message': 'Application submitted successfully.'}, status=status.HTTP_201_CREATED)



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
    

"""to view application status gotta edit it job id is visible"""
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
    user_id = request.GET.get('user_id')
    try:
        jobseeker = jobseeker.objects.get(user_id=user_id)
        return JsonResponse({'jobseekerId': jobseeker.id})
    except jobseeker.DoesNotExist:
        return JsonResponse({'error': 'JobSeeker not found'}, status=404)
    


"""personal info setup for profile setup"""
@api_view(['PUT'])
def update_personal_info(request, pk):
    try:
        job_seeker = jobseeker.objects.get(id=pk)
    except jobseeker.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = jobseekerSerializer(job_seeker, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""education info setup for profile setup"""
@api_view(['PUT'])
def update_education(request, pk):
    try:
        education_instance = education.objects.get(job_seeker=pk)
    except education.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = educationSerializer(education_instance, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


"""experience info setup for profile setup"""
@api_view(['PUT'])
def update_experience(request, pk):
    try:
        experience_instance = experience.objects.get(job_seeker=pk)
    except experience.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = experienceSerializer(experience_instance, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





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

"""jobs posted by user"""
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
        job_id = self.kwargs['job_id']  # Assuming job_id is passed in URL
        return application.objects.filter(job_id=job_id)