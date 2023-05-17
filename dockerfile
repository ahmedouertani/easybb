FROM ubuntu:20.04
USER root
RUN apt-get update -y && \
    apt-get -y upgrade 
RUN apt-get install -y curl
COPY bqq /bqq
RUN curl -sL https://deb.nodesource.com/setup_16.x -o setup_14.sh && \
    sh ./setup_14.sh && \
    apt update -y && \
    apt install nodejs
WORKDIR /bqq
RUN npm install -g @angular/cli
RUN npm install --global yarn 
RUN yarn cache clean
RUN rm -rf node_modules
RUN npm install -g npm@7.5.6
RUN npm install
RUN ng build
COPY startup.sh /bqq
WORKDIR /bqq
RUN chmod 777 ./startup.sh
CMD [ "/bin/bash","startup.sh" ]
