# Install Environment and dependances

Just follow steps !


## Linux :

- Create env : python3 -m venv env

- Select it : source env/bin/activate

- (See Dependances : python -m pip list)

- (List them for requirements.txt : python -m pip freeze)

- Install requirements.txt : python -m pip install -r requirements.txt

- Let's try : python3 manage.py runserver

## Windows

- Create env : python3 -m venv env

- Select it : source env/bin/activate

- (See Dependances : python -m pip list)

- (List them for requirements.txt : python -m pip freeze)

- Install requirements.txt : python -m pip install -r requirements.txt

- Let's try : python3 manage.py runserver

## Useful commands

- Update local database schema : python manage.py migrate

- Make a migrations loccaly : python manage.py makemigrations

- Launch app : python3 manage.py runserver

- Push on Heroku (need commit) : git push heroku main