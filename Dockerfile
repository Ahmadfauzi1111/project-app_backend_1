# Dari node berapa
FROM node:14-alpine
 
# Direktori yang digunakan
WORKDIR /usr/src/app
# Mencopy package.json
COPY package.json .
# Menjalan npm install
RUN npm install
# Mengcopy semua file
COPY . .

# Menjalan kan applikasi
CMD npm run start:dev