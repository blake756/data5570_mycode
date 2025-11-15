from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def list(self, request):
        tasks = self.get_queryset()
        serializer = self.get_serializer(tasks, many=True)
        return Response({'tasks': serializer.data})

