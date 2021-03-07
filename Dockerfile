FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY . .

RUN yarn && yarn build:codegen && yarn build \
  && addgroup next && adduser -D -G next next && chown -R next:next .

USER next
CMD ["yarn", "start"]
