FROM node:22-alpine

ENV PORT=8000

COPY . .

RUN npm install && \
    npm install -g typescript && \
    npm run build

EXPOSE $PORT

ENTRYPOINT [ "node", "dist/server.js" ]