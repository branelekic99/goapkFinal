from django.contrib import admin
from django.urls import path,include,re_path
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView


urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^odmor/',include('odmori.urls')),
    re_path(r'api/',include('users.urls')),
    # re_path(r'',TemplateView.as_view(template_name='index.html'))
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)