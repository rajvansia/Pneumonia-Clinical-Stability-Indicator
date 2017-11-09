FROM node:7.10.0-alpine

WORKDIR /opt/app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN npm install -g serve

COPY . .

RUN npm run build

CMD serve -s --port 5000 build
