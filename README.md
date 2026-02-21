# Todo Task 9

Проект содержит 3 отдельные реализации строго по пунктам задания.

## 1) v1-jsonplaceholder (CRA)
- Вывод списка дел из JSONPlaceholder (`/todos`)
- Только чтение списка

Запуск:
```bash
cd v1-jsonplaceholder
npm install
npm start
```

## 2) v2-jsonserver (CRA + JSON Server)
- Пустой начальный список (`db.json`)
- CRUD
- Поиск по фразе
- Переключаемая сортировка по алфавиту
- Продвинутый поиск через debounce

Запуск:
```bash
cd v2-jsonserver
npm install
npm run server   # json-server@0.17.4 на 3001
npm start        # React на 3000
```

## 3) v3-firebase (CRA + Firebase)
- CRUD через Firebase Realtime Database
- Поиск и сортировка на клиенте
- Debounce

Запуск:
```bash
cd v3-firebase
npm install
copy .env.example .env
# заполните REACT_APP_FIREBASE_* переменные
npm start
```

Deploy (Firebase Hosting):
```bash
cd v3-firebase
npm run build
npx firebase login
npx firebase use --add
npx firebase init hosting
npx firebase deploy
```
