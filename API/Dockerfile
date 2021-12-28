FROM node

WORKDIR /usr/app

ENV NODE_ENV=development
ENV DATABASE_URL=postgres://postgres:postgres@postgres:5432/biopark
ENV PORT=4000
ENV AUTH_SECRET=123
ENV FSERVER=localhost
ENV FPORT=3000

COPY ./package*.json ./
RUN npm config set strict-ssl false
RUN npm install

COPY . .

EXPOSE $PORT

CMD npm start
