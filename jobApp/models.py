from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import date


class usertable(models.Model):

    USERTYPE_CHOICES = [
        ('recruiter', 'Recruiter'),
        ('jobseeker', 'Jobseeker'),
    ]
    USER_AUTH_TYPE = [
        ('username/password', 'Username/Password'),
        ('google auth', 'Google Auth')
        
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    email = models.EmailField(unique=True)
    usertype = models.CharField(max_length=20, choices=USERTYPE_CHOICES)
    user_auth_type = models.CharField(max_length=50, choices=USER_AUTH_TYPE, default= 'username/password')
    def __str__(self):
        return self.email
    
    
class recruiter(models.Model):
    user = models.OneToOneField(usertable, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    lname=models.CharField(max_length=255, null=True)
    contact_no = models.CharField(max_length=20, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)


    def __str__(self):
        return self.name

class jobseeker(models.Model):
    user = models.OneToOneField(usertable, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    lname=models.CharField(max_length=255, null=True)
    contact_no = models.CharField(max_length=20, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    fresher = models.CharField(max_length=1, choices=[('Y', 'Yes'), ('N', 'No')])
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)


    def __str__(self):
        return self.name

class education(models.Model):
    EDUCATION_LEVEL_CHOICES = [
        ('10th', '10th'),
        ('12th', '12th'),
        ('Diploma', 'Diploma'),
        ('UG', 'Undergraduate'),
        ('PGDM', 'PGDM'),
        ('PG', 'Postgraduate'),
        ('PhD', 'PhD'),
        ('Certificate Courses', 'Certificate Courses'),
        ('Other', 'Other'),
    ]
    STATUS_CHOICES = [
        ('Completed', 'Completed'),
        ('Pursuing', 'Pursuing'),
        ('Interrupted', 'Interrupted'),
    ]
    job_seeker = models.ForeignKey(jobseeker, on_delete=models.CASCADE)
    education_level = models.CharField(max_length=50, choices=EDUCATION_LEVEL_CHOICES)
    field_of_study = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    institution = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    grade = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return f'{self.education_level} - {self.institution}'
    
class company(models.Model):
    name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phn_no = models.CharField(max_length=20, blank=True, null=True)
    recruiter = models.ForeignKey(recruiter, on_delete=models.SET_NULL, null=True, blank=True)
    website = models.URLField(blank=True, null=True)
    headquarters = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class experience(models.Model):
    job_seeker = models.ForeignKey(jobseeker, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    company_name = models.CharField(max_length=200,null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    responsibility = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.job_title
    

class job(models.Model):
    EMPLOYMENT_TYPE_CHOICES = [
        ('full time', 'Full Time'),
        ('part time', 'Part Time'),
        ('hybrid', 'Hybrid'),
        ('remote', 'Remote'),
        ('internship', 'Internship'),
        ('bonded', 'Bonded'),
        ('Wfh','Work-from-Home')
    ]
    recruiter = models.ForeignKey('recruiter', on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    job_description = models.TextField()
    company_id = models.ForeignKey('company', on_delete=models.CASCADE)
    industry = models.CharField(max_length=100, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    jobpost_date = models.DateField(auto_now_add=True)
    last_date = models.DateField(blank=True, null=True)
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPE_CHOICES)
    like_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.job_title
    
    def like(self):
        self.like_count += 1
        self.save()

from django.db import models

class application(models.Model):
    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Pending', 'Pending'),
        ('Reviewed', 'Reviewed'),
        ('Under consideration', 'Under Consideration'),
        ('Interviewing', 'Interviewing'),
        ('In progress', 'In Progress'),
        ('Rejected', 'Rejected'),
        ('Hired', 'Hired'),
        ('Closed', 'Closed'),
    ]

    job = models.ForeignKey(job, on_delete=models.CASCADE)
    email = models.EmailField()  # Change ForeignKey to EmailField
    resume_path = models.CharField(max_length=255)
    remarks = models.TextField(null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Applied')
    applied_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'{self.job}'



