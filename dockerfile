FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

# Build TypeScript
RUN npm run build

# Exposition du port
EXPOSE 4001

# Démarrage de l'application
CMD ["node", "dist/index.js"]