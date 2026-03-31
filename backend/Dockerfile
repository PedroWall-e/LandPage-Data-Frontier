# Use the official lightweight Node.js image (debian slim resolves musl/glibc issues)
FROM node:22-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copiar dependências
COPY package*.json ./

# Instalar compiladores pro node-gyp no ARM64 e ignorar lockfile de cross-platform
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN rm -f package-lock.json && npm install --omit=dev

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "start" ]
