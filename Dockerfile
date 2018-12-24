FROM node:alpine

WORKDIR /app/

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 4200

RUN ls -la

CMD ["npm", "start"]