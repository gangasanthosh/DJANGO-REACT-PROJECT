#from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import usertable, jobseeker, recruiter, job, application, company,education,experience
from .serializers import usertableSerializer, jobseekerSerializer, recruiterSerializer, jobSerializer, applicationSerializer, companySerializer,educationSerializer,experienceSerializer


from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated

from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserSerializer

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
    queryset = job.objects.all().order_by('-like_count')[:6]
    serializer_class = jobSerializer

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        job = self.get_object()
        job.like_count += 1
        job.save()
        return Response({'status': 'like count incremented'})

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



@api_view(['POST']) #for signing in
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        data = request.data  # Assuming the request is sending JSON data
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=400)
        user = authenticate(request, email=email, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
    return Response({'error': 'Invalid Credentials'}, status=400)

from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import UserSerializer

class RegisterView(APIView): #for registering
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class GetUserTypeView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            user = usertable.objects.get(email=email)
            usertype = user.usertype  # Assuming 'usertype' is a field in UserTable
            return Response({'usertype': usertype}, status=status.HTTP_200_OK)
        except usertable.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)