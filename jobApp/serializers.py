from rest_framework import serializers
from .models import usertable, jobseeker, recruiter, job, application, company, education, experience
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    usertype = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    user_auth_type = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'usertype', 'user_auth_type']

    def create(self, validated_data):
        usertype = validated_data.pop('usertype')
        password = validated_data.pop('password')
        user_auth_type = validated_data.pop('user_auth_type')
        print(password)
        print('Above validated')
        user = User.objects.create_user( **validated_data)
        user.set_password(password)
        user.save()
        
        print(user_auth_type)
        print("Log above")
        user_profile = usertable.objects.create(user=user, usertype=usertype, email=user.email, user_auth_type=user_auth_type)
        
        if usertype == 'recruiter':
            recruiter.objects.create(user=user_profile, name=user.username)
        elif usertype == 'jobseeker':
            jobseeker.objects.create(user=user_profile, name=user.username)

        return user

    def validate_usertype(self, value):
        if value not in ['recruiter', 'jobseeker']:
            raise serializers.ValidationError("Usertype must be either 'recruiter' or 'jobseeker'")
        return value


class usertableSerializer(serializers.ModelSerializer):
    class Meta:
        model = usertable
        fields = '__all__'

class jobseekerSerializer(serializers.ModelSerializer):
    class Meta:
        model = jobseeker
        fields = '__all__'

class recruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = recruiter
        fields = '__all__'

class jobSerializer(serializers.ModelSerializer):
    class Meta:
        model = job
        fields = '__all__'

class applicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = application
        fields = '__all__'

class educationSerializer(serializers.ModelSerializer):
    class Meta:
        model = education
        fields = '__all__'

class companySerializer(serializers.ModelSerializer):
    class Meta:
        model = company
        fields = '__all__'

class experienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = experience
        fields = '__all__'

