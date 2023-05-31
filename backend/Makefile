# Description: Backend Makefile

.PHONY: help

start: up install schema migrate seed ## Start the application

up: ## Start the application
	@echo "Starting the application..."
	docker-compose up -d

down: ## Stop the application
	@echo "Stopping the application..."
	docker-compose down

restart: down up ## Restart the application

install: ## Install dependencies
	@echo "Installing app dependencies..."
	docker-compose exec backend npm install

schema: ## Generate bdd schema
	@echo "Linking bdd"
	docker-compose exec backend npx prisma generate 

migrate: ## Migrate bdd
	@echo "Migrating bdd"
	docker-compose exec backend npx prisma migrate dev

seed: ## Seed bdd
	@echo "Seeding bdd"
	docker-compose exec backend npx prisma db seed

help:
	@echo "Arosaje Backend Tasks"
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo ""