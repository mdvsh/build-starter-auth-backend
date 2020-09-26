 ## 🐌 ExpressJS Backend w/ JWT+GoogleOAuth2.0 Starter

### Project setup

#### Google Sign-In

- Add an API to your google developer's console (preferably `Google+ API`).
- Configure an OAuth consent screen with the correct details.
- Create a client id with correct Authorised Redirect URIs, here:
  - `http://localhost:8000/auth/google/cb` (dev)
  - `https://<heroku_app_name>.herokuapp.com/auth/google/cb` (production)
  
- Rename `.plox.bring.ur.own.env` to `.env` and add your clientID and clientSecret to it.

#### MongoDB Setup

- create a cluster within you free MongoDB instance
- enter dbname and password to `.env` as shown below.

```env
MONGODB_PSWD=<here>
MONGODB_DBNAME=<here>
JWT_ACCESS_KEY=<here>
GOOGLE_CLIENT_ID=<here>
GOOGLE_CLIENT_SECRET=<here>
````

---

#### Deploy

> heroku go brrr...

```console
$ heroku
$ heroku create <heroku_app_name>
$ git add .
$ git commit -m "letsfrickingooo"
$ git push heroku master
$ echo "if something is weird, check logs :\"
$ heroku logs
```

you'll also need to add the environment variables as heroku configvars either from webapp dashboard settings or individually like this one

```console
$ heroku config:set ENV_VAR_NAME=env_var_value
```
----

#### hi
*pseudocodenerd*, madhav s sharma
