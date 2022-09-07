FROM node:latest as build-stage

WORKDIR /usr/src/app

COPY . .

# Using regular user instead of root for better security
RUN chown -R node:node /usr/src/app
USER node

RUN npm ci && npm run build

# Using nginx for hosting the frontend
FROM nginx:1.23.1-alpine

ENV PORT 80

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

# This is needed for parsing the PORT environment variable (used with Heroku)
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'