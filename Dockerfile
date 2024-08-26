# Use the official Node.js LTS Alpine image as a base image
FROM node:lts-alpine

# Set environment variables
ENV NODE_ENV=development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies, including devDependencies for development
RUN npm install --silent

# Copy the rest of the application code
COPY . .

# Expose the application's port
EXPOSE 3000

# Use nodemon for development (automatically restarts the server on code changes)
CMD ["npx", "nodemon", "index.js"]
