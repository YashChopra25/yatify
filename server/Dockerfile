# Use the official Node.js image from the Docker Hub
FROM node:18-alpine


# Set the working directory in the container
WORKDIR /home/server/

# Copy the package.json and package-lock.json to the container
COPY ./package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["npm", "start"]

