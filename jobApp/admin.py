from django.contrib import admin

# Register your models here.from django.contrib import admin
from .models import usertable, jobseeker, recruiter, job, application, company, education, experience

class JobseekerAdmin(admin.ModelAdmin): 
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = usertable.objects.filter(usertype='jobseeker')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

class RecruiterAdmin(admin.ModelAdmin):
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "user":
            kwargs["queryset"] = usertable.objects.filter(usertype='recruiter')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(jobseeker, JobseekerAdmin)
admin.site.register(recruiter, RecruiterAdmin)
admin.site.register(usertable)
admin.site.register(job)
admin.site.register(application)
admin.site.register(company)
admin.site.register(education)
admin.site.register(experience)

