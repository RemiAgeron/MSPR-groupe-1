# MSPR Arosaje

Ce projet est un projet d'étude pour le bachelor concepteur et développeur d'application de l'EPSI.

## Installation

### Prérequis

- Docker
- Docker-compose
- NodeJS
- NPM

### Développement

Démarrer les conteneurs avec :

```bash
docker-compose up --build
```
#### Backend

Installer les paquets et initialiser la BDD :

```bash
make start
```

Visualiser les données de la BDD :

Utiliser **Adminer** à l'adresse http://localhost:5555 ou utiliser **Prisma Studio** :

```bash
docker-compose exec backend npx prisma studio
```