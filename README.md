# 🌱 Arosaje 🌱
---

Ce projet est un projet d'étude réalisé dans le cadre du **Bachelor Concepteur Développeur d'Applications** à l'EPSI de Toulouse.

## Équipe
- Tristan Besombe
- Thomas Loubat
- Rémi Ageron
- Théo Robillard
- Marouane 

## Technologies utilisée
- Express
- Postgres
- Ionic Angular 

---
## Prérequis
- Docker
- Docker-compose
- NodeJS
- NPM

## Installation

1.  Lancer les conteneurs
```bash
docker-compose up --build
```
### Backend

*Les commandes ci-dessous doivent être réalisés dans le répertoire **backend**.*

2.  Initialiser le backend:
```bash
cd backend/
make init
```
3.  Insérer les données de base de la BDD (optionnel):
```bash
make seed
```

4. Visualiser les données : Adminer sur le **port 8080** ou
```bash
make studio
```

 ### Frontend

*Les commandes ci-dessous doivent être réalisés dans le répertoire **frontend**.*

**[WIP]**
