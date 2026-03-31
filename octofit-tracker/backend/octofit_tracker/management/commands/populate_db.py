from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

# Beispielmodelle (diese sollten in models.py definiert werden)
# Hier als Platzhalter für die Datenbank-Initialisierung
class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        app_label = 'octofit_tracker'

class Activity(models.Model):
    name = models.CharField(max_length=100)
    user = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    class Meta:
        app_label = 'octofit_tracker'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        app_label = 'octofit_tracker'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        app_label = 'octofit_tracker'

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Daten löschen
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        ironman = User.objects.create_user(username='ironman', email='ironman@marvel.com', password='test123')
        batman = User.objects.create_user(username='batman', email='batman@dc.com', password='test123')
        superman = User.objects.create_user(username='superman', email='superman@dc.com', password='test123')
        spiderman = User.objects.create_user(username='spiderman', email='spiderman@marvel.com', password='test123')

        # Activities
        Activity.objects.create(name='Run', user='ironman', team='Marvel')
        Activity.objects.create(name='Swim', user='batman', team='DC')
        Activity.objects.create(name='Bike', user='superman', team='DC')
        Activity.objects.create(name='Yoga', user='spiderman', team='Marvel')

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=200)
        Leaderboard.objects.create(team='DC', points=150)

        # Workouts
        Workout.objects.create(name='Pushups', difficulty='Medium')
        Workout.objects.create(name='Squats', difficulty='Easy')
        Workout.objects.create(name='Plank', difficulty='Hard')

        self.stdout.write(self.style.SUCCESS('octofit_db erfolgreich mit Testdaten befüllt.'))
