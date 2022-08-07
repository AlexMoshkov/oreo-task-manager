FROM node:alpine
# Create app directory
RUN mkdir /app
WORKDIR /app
# Install app dependencies
COPY app/package.json /app/
RUN npm install
# Bundle app source
COPY ./app /app
RUN npm run build
EXPOSE 3000
CMD [ "yarn", "start" ]
