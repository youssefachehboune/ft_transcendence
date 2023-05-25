## Installation

1. Clone the repository to your local machine:

```bash
$ git clone <repository_url>
```

2. Navigate to the project directory backend:

```bash
$ cd project-directory/backend
```

3. Install the required dependencies:

```bash
$ npm install
```

4. Create a .env file in this directory and fill it (you can refer to .env.example for guidance).


## Database Setup

1. Push the Prisma migrations to your database:

```bash
$ npx prisma db push
```
## Testing

2. Seed the database with initial data (if applicable):

```bash
npx prisma db seed
```

3. Launch Prisma Studio to interact with the database:

```bash
npx prisma studio
```

 Please note that I adjusted the wording slightly for clarity. Make sure to replace `<repository_url>` with the actual URL of your repository and update the `project-directory` accordingly. 👍
