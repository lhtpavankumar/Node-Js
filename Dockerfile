FROM node:18-alpine
# update package sources list
RUN apt update
# Create app directory
RUN mkdir -p /usr/src/app
# Create working directory
WORKDIR /usr/src/app
# Bundle app source
COPY . /usr/src/app
# Install app dependencies
RUN npm install --production
# Expose port
EXPOSE 3000
# Start npm
CMD [ "npm", "start" ]
