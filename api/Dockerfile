FROM node:18.16.0
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
EXPOSE 5000
CMD npm start