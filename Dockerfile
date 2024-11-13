FROM node:22.11.0-alpine3.19 AS builder

RUN apk update && apk add --no-cache \
    python3 \
    make \
    g++ \
    libc-dev

WORKDIR /app/source

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
RUN npm install typescript -g

COPY . .

RUN tsc


FROM node:22.11.0-alpine3.19

WORKDIR /app/source

COPY --from=builder /app/source .

EXPOSE 3000

CMD ["npm", "run", "prod"]