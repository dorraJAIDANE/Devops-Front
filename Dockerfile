FROM node:16-alpine AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package et installer les dépendances
COPY package*.json ./

RUN npm install --force

# Copier le reste des fichiers et construire l'application Angular
COPY . .
RUN npm run build --prod

# Étape 2 : Préparer le serveur Nginx pour déployer l'application
FROM nginx:alpine

# Copier les fichiers de build d'Angular dans le répertoire par défaut de Nginx
COPY --from=build /dist/front_yacine /usr/share/nginx/html

# Exposer le port 8287
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
