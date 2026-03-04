## 📚 Libs

1. cookie-parser
2. express
3. nodemon
4. dotenv
5. mongodb
6. mongoose
7. jsonwebtoken
8. bcryptjs
9. arject


## 📋 Roadmap

1. Create a specific file for initialization -> `server.js`
2. Route centralizer `routes / index.js`
3. `Config /env.js` -> Organize, centralize, and control all application settings, especially evironment variables, preparing the project to run safely in multiple environments
4. Connect the database to the backend with `mongoose`
5. Create `Models`
6. Creating a general middleware to handle errors, primarily those originating from Mongoose. `error.middleware.js`
7. Start the authentication controllers / `atomic config`
8. Start controllers for `user routes`
9. `Middleware` of authorization
10. Start controllers for `Subscription routes`



## ⚛️ Atomic concept

- "Atomic" comes from atomicity (a database concept)
- 👉 It means
   - Either everything happens, or nothing happens

```
const session = await mongoose.startSession()
session.startTransaction()
```
- "I'm going to start a TRANSACTION at the bank"
- ✅ If everything goes well:
```
await session.commitTransaction()
```
- 👉 Confirm everything at the bank
- 👉 Now the data is actually saved 
- ❌ If an Error occurs:
```
await session.abortTransaction()
```
- 👉 Cancel everything
- 👉 As is nothing had happened
- You need to pass the session in the operations
  - 👉 Otherwise , is is not part of the transaction