FROM node:18.16.0
WORKDIR /app
COPY . /app
RUN npm install --force
RUN npm run build
EXPOSE 3000
CMD npm start