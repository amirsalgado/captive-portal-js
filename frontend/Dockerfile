# Dockerfile for React frontend
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the React app for production
RUN npm run build

# Serve the app using a simple server
FROM nginx:alpine

# Copy the build files to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port on which nginx will serve the app
EXPOSE 80
