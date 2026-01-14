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

# Create start script inline
RUN echo '#!/bin/sh' > start.sh && \
    echo 'cd /app/server' >> start.sh && \
    echo 'node dist/main.js &' >> start.sh && \
    echo 'cd /app/client' >> start.sh && \
    echo 'node .next/standalone/server.js' >> start.sh && \
    chmod +x start.sh

ENV NODE_ENV=production

EXPOSE 3000 5050

CMD ["./start.sh"]
