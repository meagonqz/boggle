# Boggle

Implementation of Boggle in React!

[Play!](https://meagonqz.github.io/boggle/)

This game of Boggle is for fun and not for profit :)

It is set up with a [backend](https://github.com/meagonqz/boggle-backend) so
that users can login with Google OAuth to save their scores over time. I
may someday add some other data related features.

For now, in the UI, you only see your historical high score (if you're logged
in). You only have access to your own past scores.

To logout, you'll need to clear your cookies at the [hosted backend](https://peaceful-hamlet-86580.herokuapp.com/api). In production, this site uses a HTTP-only secure cookie with a serverside client secret, so your OAuth information is safe.

# Local development
This app was bootstrapped using [Create React App](https://github.com/facebook/create-react-app)

To run the server, **`cd app`** and:

Install dependencies:
```
yarn install
```

Start the server
```
npm start
```

To kick off a deployment:
```
npm deploy
```

To set up with a local backend, edit
[apollo.js](https://github.com/meagonqz/boggle/blob/master/app/src/helpers/apollo.js) to point to your backend, i.e. http://localhost:4000
