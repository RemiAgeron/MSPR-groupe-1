"""A_rosa_je URL Configuration"""

from django.contrib import admin
from django.urls import path, include

urlpatterns =   [
    path('admin/', admin.site.urls),
    path('api/', include('A_rosa_je_site.urls'))
]