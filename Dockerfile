# Stage 1: Install development dependencies
FROM node:20-alpine AS development-dependencies-env
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN npm ci

# Stage 2: Install production dependencies
FROM node:20-alpine AS production-dependencies-env
WORKDIR /app
COPY package*.json yarn.lock* ./
RUN npm ci --omit=dev

# Stage 3: Build the React app
FROM node:20-alpine AS build-env
WORKDIR /app
# Copy only necessary files for build, including node_modules from dev stage
COPY --from=development-dependencies-env /app/node_modules ./node_modules
# Copy source code
COPY . .
# Run the build command
RUN npm run build

# Stage 4: Create the final production image
FROM node:20-alpine
WORKDIR /app
# Copy production node_modules
COPY --from=production-dependencies-env /app/node_modules ./node_modules
# Copy the built application from the build stage
# Assuming your build output is in a 'build' directory
COPY --from=build-env /app/build ./build
# Copy static assets if any (e.g., public folder)
COPY --from=build-env /app/public ./public

# Expose the port your app runs on (change if necessary)
EXPOSE 3000

# Command to run the application
# Ensure your start script in package.json correctly serves the build output
CMD ["npm", "run", "start"]
