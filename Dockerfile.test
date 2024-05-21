# Use node v20 image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy remaining project files
COPY . .

# Set the non-root user to run the application
USER node

# Expose server on port 3000
EXPOSE 3000

# Define a healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD curl --fail http://localhost:8000/health || exit 1

# Start the backend
CMD ["npm", "run", "dev"]