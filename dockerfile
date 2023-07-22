# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to WORKDIR
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire app source code to the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the built app with a web server
FROM nginx:alpine

# Copy the build from the previous step to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start the Nginx web server
CMD ["nginx", "-g", "daemon off;"]
