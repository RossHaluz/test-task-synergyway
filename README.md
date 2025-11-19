🚀 Next.js Project
Цей проєкт розроблений на Next.js та підтримує запуск як локально, так і через Docker для продакшн-середовища.

📦 Технології
Next.js
TypeScript
Docker

⚙️ Локальний запуск
1. Встановити залежності:
npm install

2. Запустити локальний сервер:
npm run dev

3. Відкрити в браузері:
http://localhost:3000

🐳 Docker
🔨 Зібрати Docker image:
docker build -t my-next-app .

▶️ Запустити контейнер:
docker run -p 3000:3000 my-next-app

Після запуску застосунок буде доступний за адресою:
http://localhost:3000

📄 Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

🧪 Корисні команди
npm run dev      — запуск у режимі розробки
npm run build    — продакшн-збірка
npm start        — запуск продакшн сервера

👨‍💻 Автор
Ростислав Галузинський
Full-Stack Developer (React & Node.js)