
    # Use an official Node.js image as a base
    FROM node:latest
    
    # Set the working directory in the container
    WORKDIR /app
    
    # Copy the package*.json files
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy the application code
    COPY . .
    
    # Expose the port
    EXPOSE 3000
    
    # Run the command to start the application
    CMD ["node", "index.js"]
    