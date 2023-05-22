
## Installation

```bash
$ npm install
```

## Preparing the database
check the README in the database folder
running that container will result in the creation and initialization of 2 tables (texts and configs), to create the rest run:
``` 
npx prisma db push
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Checking the database
you can monitor your database by prisma studio, run:
```bash
$ npx prisma studio
```
## Testing

http://localhost:3000/google shoud log you in using your Google account, create cookies for access token and refresh token and store the refresh token in the database.

http://localhost:3000/profile should return some user information if the access token is still valid or Unauthorized if the access token has expired.

http://localhost:3000/refresh should return a new access token if the refresh token is still valid or Unauthorized if the refresh token has expired.

http://localhost:3000/logout should clear the cookies and remove the refresh token from the database if the access token is still valid.