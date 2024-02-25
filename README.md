# Template for web apps

- Vite builds the frontend with SolidJS
- Supabase provides secured DB and file storage
- Storybook configured with SolidJS to isolated component test

Comes already with a sidebar with navigation, some paths only accessible to authorized users.

`/login` with redirection to where the user expected to access out of the box.

A logged in user will see a section at the bottom of the sidebar with logout button.

## How to run

Note: feel free to use `bun` instead of `npm`.

1. Clone and install dependencies
```sh
NAME='my-cool-app'
git clone git@github.com:amatiasq/app "$NAME"
cd "$NAME"
npm install
```

2. Create `.env` by copying it from `.env.sample`
```sh
cp .env.sample .env
```

3. Run supabase
```sh
npm run supabase
```

4. Run vite
```sh
npm run vite
```

5. Open `http://localhost:8000`. This is supabase admin.
6. Create a user at `http://localhost:8000/project/default/auth/users`
7. Open whatever port Vite used (`http://localhost:5173` maybe?)
8. Login with that user

You may want to replace all occurrences of `app-template` in files with the name of your application.

If you're deploying this change the values in `.env`. [Supabase docs](https://supabase.com/docs/guides/self-hosting/docker#securing-your-services) are great for this.
