FROM node:18-alpine

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install -g del-cli
RUN npm install -g typescript

RUN npm install
COPY . .

CMD ["npm", "run", "prod:docker"]
