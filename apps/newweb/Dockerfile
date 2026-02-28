# Use Bun's official image
FROM oven/bun:latest

# Specify Args
ARG API_BASE_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_STORAGE_BASE_URL

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies using lockfile for exact versions
RUN bun install
RUN bun db:generate

# Pass build-time env
ENV API_BASE_URL=$API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_STORAGE_BASE_URL=$NEXT_PUBLIC_STORAGE_BASE_URL

# Build the application
WORKDIR /app/apps/newweb
RUN bun run build
