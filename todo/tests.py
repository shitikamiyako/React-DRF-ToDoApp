from django.shortcuts import render

# Create your views here.
from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Todo

User = get_user_model()


class TodoTests(TestCase):
    @classmethod
    def setUpTestData(cls):

        # Create a User

        testuser2 = User.objects.create_user(
            username='testuser2',
            password='hironomi',
            email='test@sample2.com'
        )

        testuser2.save()

        test_todo = Todo.objects.create(
            task_name='test',
            task_detail='sample',
            owner=testuser2
        )

        test_todo.save()

    def test_todo_content(self):
        todo = Todo.objects.get(id=1)
        expected_owner = f'{todo.owner}'
        expected_task_name = f'{todo.task_name}'
        expected_task_detail = f'{todo.task_detail}'
        self.assertEquals(expected_owner, 'testuser2')
        self.assertEquals(expected_task_name, 'test')
        self.assertEquals(expected_task_detail, 'sample')
