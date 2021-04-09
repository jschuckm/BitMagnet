cd Backend 
npm install
lsof -ti tcp:8000 | xargs kill
npm run start&