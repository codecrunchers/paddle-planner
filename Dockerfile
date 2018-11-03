FROM node:8
WORKDIR /var/www/pp
COPY package*.json ./
RUN npm install && \
  npm i -g pm2
EXPOSE 3000
#Include Src
COPY . .
CMD ["pm2", "start", "processes.json", "--no-daemon"]
#CMD [ "npm", "start" ]
