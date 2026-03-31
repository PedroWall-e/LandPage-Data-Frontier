# Use the official lightweight Node.js image (debian slim resolves musl/glibc issues)
FROM node:22-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install only production dependencies.
RUN npm install --omit=dev

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "start" ]
