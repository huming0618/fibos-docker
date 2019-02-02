# Version: 0.0.1
FROM ubuntu:latest
MAINTAINER Peter Hu  "huming0618@gmail.com"
RUN apt-get update
RUN apt-get install sudo curl vim libssl1.0.0 git gnupg gnupg2 gnupg1 -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
RUN apt install nodejs -y

RUN curl -s https://fibos.io/download/installer.sh |sh
RUN npm i fibos.js -g

RUN cd /var/local && \
    git clone https://github.com/huming0618/fib-testnet && \
    cd fib-testnet && \
    fibos --install 
RUN echo "[Ready] To Run FIBOS Node"
COPY run.sh /var/local/fib-testnet 
RUN chmod +x /var/local/fib-testnet/run.sh
EXPOSE 8801
WORKDIR /var/local/fib-testnet
# ENTRYPOINT ["fibos","index.js","dev"]
# RUN pkill fibos && fibos index.js dev
