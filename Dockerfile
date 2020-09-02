FROM node

RUN git clone https://github.com/KartulUdus/Sliomach-api.git && cd Sliomach-api && npm install

WORKDIR Sliomach-api

CMD npm start