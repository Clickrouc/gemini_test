# Test Task: CRUD admin panel for accounts
**Stack: Typescript, React, Express, MongoDB**

If you want to run project locally you need to do next:
1. Download and install MongoDB community server
2. Create database in MondoDB (I use `gemini` name)
3. If you need, change db url in `server/.end`
4. Start server from `server` directory `npm run dev`
5. Start client from `client` directory `npm run start`
6. Register your account from client.
7. Create some proxies by endpoint `GET` `http://localhost:3000/v1/proxies`. Structure of body is `{ "name": "PROXY100" }`, and you need give Bearer token generated by `POST` `http://localhost:3000/v1/auth/login`. More information about authorization you can get in swagger: `http://localhost:3000/v1/docs`.
8. That's all! You can use app.

If you don't want to set up environment, you can connect to my server.
1. Change `apiURL` variable in `client/src/services/queryConfig.ts` to `https://gemini-server.clickrouc.ru/v1`
2. Start client from `client` directory `npm run start`
3. You can use app more simply :)

And you can watch project just on `https://gemini.clickrouc.ru`