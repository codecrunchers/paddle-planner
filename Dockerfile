FROM node:8
WORKDIR /var/www/pp
COPY package*.json ./
RUN npm install
EXPOSE 3000
#Include Src
COPY . .
CMD [ "npm", "start" ]
