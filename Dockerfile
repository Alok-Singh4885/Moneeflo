FROM node:22.11.0-alpine3.19 AS builder

ENV NODE_ENV=production

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc-dev

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install && \
    npm install -g typescript && \
    npm cache clean --force

COPY . .

RUN npm run build || tsc

FROM node:22.11.0-alpine3.19

ENV NODE_ENV=production
ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/migrate-mongo-config.js ./
COPY --from=builder /app/.env ./.env

RUN npm install --only=production && \
    npm install -g migrate-mongo && \
    npm cache clean --force

EXPOSE 4001

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:4001 || exit 1

CMD ["sh", "-c", "npx migrate-mongo up && npm run prod"]