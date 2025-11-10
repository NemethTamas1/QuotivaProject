# Builder
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production=false

COPY . .


# Runner
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]