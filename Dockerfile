FROM node:14.18.0-alpine3.14 as builder
COPY package.json package-lock.json ./
RUN  npm install && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --build-optimizer=false --aot --source-map=false
FROM nginx:stable-alpine
RUN mkdir -p /usr/share/nginx/html/inventry-pos/dist \
&& mkdir -p /etc/nginx/certs/ \
&& mkdir -p /etc/letsencrypt/live/com.inventery/
RUN apk add nano iputils bash
COPY --from=builder /ng-app/dist /usr/share/nginx/html/inventry-pos/dist/
ADD fullchain1.pem  /etc/letsencrypt/live/com.inventery/
ADD privkey1.pem  /etc/letsencrypt/live/com.inventery/
ADD options-ssl-nginx.conf /etc/letsencrypt/
RUN addgroup -g 1000 -S www-data \
&& adduser -u 1000 -D -S -G www-data www-data ||:
ADD nginx.conf /etc/nginx/
RUN chmod 775 -R /usr/share/nginx/html
EXPOSE 80:80
