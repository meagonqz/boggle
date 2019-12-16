# Boggle

Implementation of Boggle in React!

[Play!](https://meagonqz.github.io/boggle/)

This game of Boggle is for fun and not for profit :)

It is set up with a [backend](https://github.com/meagonqz/boggle-backend) so
that users can login with Google OAuth to save their scores over time. I
may someday add some other data related features.

For now, in the UI, you only see your historical high score (if you're logged
in). You only have access to your own past scores.

To logout, you'll need to clear your cookies for this site. This site uses a HTTP-only
secure cookie in production so your token is safe.

# Local development
This app was bootstrapped using [Create React App](https://github.com/facebook/create-react-app)

Install dependencies:
```
yarn install
```

To run the server, **cd into app** and:

```
npm start
```

To kick off a deployment:
```
npm deploy
```
