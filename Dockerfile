FROM node:16-alpine
WORKDIR /app/myapp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3009
CMD ["npm", "start"]
#docker build -t my-image:version --force-rm -f Dockerfile .
# docker run  -p 4000:3009 my-image:1.0
# docker run  -d 4000:3009 my-image:1.0
# docker exec -it  4000:3009 my-image:1.0 jovial_curran /bin/bash
#npm install uuid@7
#docker run  -p 4000:3009 --add-host=host.docker.internal:host-gateway  my-image:1.0
