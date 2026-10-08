# Use Node.js to build the React application
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy frontend source code
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the built React application
FROM nginx:alpine

# Copy React build files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]