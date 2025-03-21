FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json . 

RUN npm install

COPY . . 

RUN npm run build

FROM nginx:1.22.0-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]