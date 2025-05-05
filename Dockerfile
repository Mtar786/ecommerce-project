# Dockerfile
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source and build
COPY . .
RUN npm run build

# Expose and run
EXPOSE 3000
CMD ["npm", "start"]
