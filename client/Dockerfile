# Use Node.js 16 as the base image
FROM node:lts-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json) to install dependencies
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project to the working directory
COPY . .

# Build the project
RUN yarn build

# Use Nginx as the base image for the production stage
FROM nginx:stable-alpine3.17-slim AS production

# Copy the build output from the 'build' stage to the Nginx web server directory
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
# Copy custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
