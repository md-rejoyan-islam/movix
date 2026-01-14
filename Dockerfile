# Movix - Single Container Setup
FROM node:lts-alpine

ENV CI=true

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy all project files
COPY . .

# Install and build server
WORKDIR /app/server
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Install and build client
WORKDIR /app/client
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# Back to root
WORKDIR /app

# Copy start script
COPY start.sh ./
RUN chmod +x start.sh

ENV NODE_ENV=production

EXPOSE 3000 5050

CMD ["./start.sh"]
