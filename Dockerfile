FROM node:14.16.0-alpine3.13

WORKDIR /app
COPY . .

RUN yarn && yarn build:codegen \
  && addgroup next && adduser -D -G next next && chown -R next:next . \
  && chmod a+x startup.sh

USER next
EXPOSE 3000
VOLUME [ "/app/.next" ]
CMD ["sh", "startup.sh"]
