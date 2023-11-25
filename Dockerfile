# Kullanılacak Node.js sürümünü belirtin
FROM node:16

# Çalışma dizinini ayarlayın
WORKDIR /usr/src/app

# Bağımlılıkları kopyalayın ve yükleyin
COPY package*.json ./
RUN npm install

# Uygulama kaynak kodunu kopyalayın
COPY . .

# Uygulamanızın çalıştığı portu belirtin
EXPOSE 3000

# Uygulamayı başlatın
CMD ["npm", "run", "start:prod"]
