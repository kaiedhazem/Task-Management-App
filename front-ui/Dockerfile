# Step 1: Build the React application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the React application with Nginx
FROM nginx:stable-alpine

# Copy the build output from the build stage to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx configuration to set port to 3000
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to allow external access
EXPOSE 3000

# Nginx is automatically started by the base image's entrypoint, so no CMD needed
