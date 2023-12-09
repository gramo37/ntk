FROM node:18.16.0

# Build args
ARG REACT_APP_API_URL
ARG REACT_APP_API_PORT

WORKDIR /app
COPY package*.json ./
COPY create_env_file.sh ./
RUN chmod +x create_env_file.sh
RUN ./create_env_file.sh api_url=$REACT_APP_API_URL api_port=$REACT_APP_API_PORT
RUN npm install --force
COPY . /app
EXPOSE 3000
CMD npm run start:prod