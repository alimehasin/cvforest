# Use Bun's official image
FROM oven/bun:latest

# Set working directory
WORKDIR /app

# Copy source code
COPY . .

# Install dependencies and prepare database client
RUN apt-get update -y && apt-get install -y openssl
RUN bun install
RUN bun db:generate

WORKDIR /app/apps/backend
