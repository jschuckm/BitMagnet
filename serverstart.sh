cd Frontend
cd my-app 
npm install
lsof -ti tcp:3000 | xargs kill
npm run start&
npm run start &
echo "server ran start script\n"
exit 0