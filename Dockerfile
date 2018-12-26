FROM keymetrics/pm2:latest-alpine

WORKDIR /app/

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3001

CMD ["pm2-runtime", "ecosystem.config.js.js", "--web"]