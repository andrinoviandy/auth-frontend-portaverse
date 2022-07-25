FROM node:16.16-alpine AS builder
WORKDIR /app
COPY package.json .
COPY .yarn ./.yarn
COPY .yarnrc.yml .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
