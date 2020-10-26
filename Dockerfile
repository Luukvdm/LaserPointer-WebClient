# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
ENV NODE_ENV=production
RUN yarn build --mode production

# Package stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/nginx/nginx.conf   /etc/nginx/nginx.conf
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist 		/var/www/html
RUN chown nginx:nginx /var/www/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

