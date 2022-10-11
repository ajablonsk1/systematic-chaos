FROM --platform=linux/amd64 node:16.17.0-alpine as build

WORKDIR /app

COPY . /app/

RUN apk add --no-cache git
RUN npm install
RUN npm install react-scripts
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 50
CMD ["nginx", "-g", "daemon off;"]