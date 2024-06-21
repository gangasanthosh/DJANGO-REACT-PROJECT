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
from django.contrib.auth import authenticate,login
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer
from django.shortcuts import render, get_object_or_404
from django.contrib.auth import authenticate, login as django_login, logout as django_logout
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

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
    #queryset = job.objects.all().order_by('-like_count')[:6]  # for jobcards
    queryset = job.objects.all()
    serializer_class = jobSerializer


    def get_queryset(self):
        queryset = super().get_queryset()
        max_likes = self.request.query_params.get('max_likes', None)
        if max_likes:
            queryset = queryset.order_by('-like_count')[:int(max_likes)]
        return queryset
    
    # @action(detail=True, methods=['post'])
    # def like(self, request, pk=None):
    #     job = self.get_object()
    #     job.like_count += 1
    #     job.save()
    #     return Response({'status': 'like count incremented'})

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



@api_view(['POST'])                                                                          # for signing in
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
            return Response({'token': token.key})
    return Response({'error': 'Invalid Credentials'}, status=400)

@api_view(['POST'])  # Use POST method for logging out
@permission_classes([IsAuthenticated])  # Only authenticated users can access this view
def logout(request):
    if request.method == 'POST':                                                                #signing out
        request.user.auth_token.delete()  # Delete the user's auth token
        return Response({'message': 'Logout successful'})
    return Response({'error': 'Invalid request method'}, status=400) 
    

# @api_view(['POST'])
# @permission_classes([AllowAny])
# @ensure_csrf_cookie
# def login(request):
#     if request.method == 'POST':
#         data = request.data                                                                                           #login request csrf
#         email = data.get('email')
#         password = data.get('password')
#         if not email or not password:
#             return Response({'error': 'Email and password are required'}, status=400)
#         user = authenticate(request, email=email, password=password)
#         request.META["CSRF_COOKIE_USED"] = True
#         if user is not None:
#             django_login(request, user)  # Login user and create session
#             return Response({'success': 'Logged in successfully'})
#         return Response({'error': 'Invalid credentials'}, status=400)
    
# class LoginAPIView(APIView):
#     permission_classes = [AllowAny]
                                                                                                            #login view
#     @ensure_csrf_cookie
#     def post(self, request):
#         data = request.data
#         email = data.get('email')
#         password = data.get('password')
#         if not email or not password:
#             return Response({'error': 'Email and password are required'}, status=400)
#         user = authenticate(request, email=email, password=password)
#         request.META["CSRF_COOKIE_USED"] = True
#         if user is not None:
#             login(request, user)  # Login user and create session
#             return Response({'success': 'Logged in successfully'})
#         return Response({'error': 'Invalid credentials'}, status=400)


# @api_view(['POST'])
# def logout(request):
#     django_logout(request)
#     return Response({'success': 'Logged out successfully'})

# @api_view(['POST'])
# @permission_classes([AllowAny])
# def login(request):
#     if request.method == 'POST':
#         data = request.data
#         email = data.get('email')
#         password = data.get('password')
#         if not email or not password:
#             return Response({'error': 'email and password are required'}, status=400)
#         user = authenticate(request, email=email, password=password)
#         if user is not None:
#             django_login(request, user)
#             return Response({'success': 'Logged in successfully'})
#         return Response({'error': 'Invalid credentials'}, status=400)
#     return Response({'error': 'Bad request'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    django_logout(request)
    return Response({'success': 'Logged out successfully'})

class RegisterView(APIView):                                                                 # for registering
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def get_usertype(request):
    try:
        email = request.data.get('email')
        user = usertable.objects.get(email=email)
        usertype = user.usertype
        return Response({'usertype': usertype}, status=status.HTTP_200_OK)
    except usertable.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
# class GetUserTypeView(APIView):
#     def post(self, request):
#         try:
#             email = request.data.get('email')                              #to get usertype and sign in to respective pages accordingly
#             user = usertable.objects.get(email=email)
#             usertype = user.usertype
#             return Response({'usertype': usertype}, status=status.HTTP_200_OK)
#         except usertable.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

class SearchView(APIView):
    def get(self, request, format=None):
        # Get search parameters from the request
        job_title = request.query_params.get('job_title', None)
        location = request.query_params.get('location', None)                       #for searching
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

# Add the JobDetailView class here
class JobDetailView(RetrieveAPIView):
    queryset = job.objects.all()
    serializer_class = jobSerializer
    lookup_field = 'id'

# Add the companyDetailView class here
class CompanyDetailView(RetrieveAPIView):
    queryset = company.objects.all()
    serializer_class = companySerializer
    lookup_field = 'id'


@api_view(['GET'])
def check_login_status(request):
    if request.user.is_authenticated:
        return Response({'status': 'logged_in'}, status=status.HTTP_200_OK)
    else:
        return Response({'status': 'not_logged_in'}, status=status.HTTP_401_UNAUTHORIZED)


