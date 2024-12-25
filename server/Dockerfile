# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Install nodemon globally
RUN npm install -g nodemon

# Set the working directory in the container
WORKDIR /home/server/

# Copy package.json and package-lock.json before other files to leverage Docker layer caching
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Start the app with nodemon for development
CMD ["npm", "run", "dev"]
