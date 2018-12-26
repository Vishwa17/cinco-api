FROM node:alpine

WORKDIR /app/

COPY ./package.json ./

RUN npm install

COPY ./ ./

EXPOSE 3001

RUN ls -la

CMD ["npm", "start"]