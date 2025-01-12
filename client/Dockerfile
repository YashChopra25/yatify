# Use the official Node.js image from the Docker Hub
FROM node:18-alpine


# Set the working directory in the container
WORKDIR /home/client/

# Copy the package.json and package-lock.json to the container
COPY ./package*.json ./

# Install the dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app runs on
EXPOSE 5173

# Ensure that Vite runs on 0.0.0.0 instead of localhost (inside Docker)
ENV HOST=0.0.0.0

# Define the command to start the app
CMD ["npm", "run","dev"]

