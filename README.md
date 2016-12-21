# Lets Sync Up

## Link:
https://lets-sync-up.herokuapp.com/

## Summary:
This app allows you to watch a youtube video that is sync'd with all users in the room. Users in the room flag when they
are ready and once the whole room is ready the room owner can start the video. The owner has the ability to set the video,
play/pause, set video time and kick users from the room. Below the video player is a chat window where users can communicate
and to the right of the video player users can change their alias, see the room id, and see the users list.

## In action:
### Home Page
<img src='https://i.imgur.com/9RldyEj.png' width='800'>

From this page you can:
* Create a room
* Join a room
* Sign Up for an account
* Log in to an account

### Signing Up
<img src='https://i.imgur.com/pICxIxR.png' width='800'>

From this modal you can:
* Create an account by entering an alias, email, and desired password.

### Logging In
<img src='https://i.imgur.com/jaivFGp.png' width='300'>

From this pop over you can:
* log in with your credentials

### In a room
<img src='https://i.imgur.com/j56NRSp.png' width='800'>

If you are the room owner you can:
* Set the video id using a youtube link
* Set the video position (time in seconds)
* Play/Pause the video once the room is ready
* Kick a user from the room
* Change your alias
* Chat with users in the room

If  you are just a user you can:
* Flag yourself as ready
* Change alias
* Chat with other users in the room

## Tech Used:
* JavaScript
* React
* Redux
* React Router
* bootstrap
* socket-io
* NodeJS
* ExpressJS
* Passport
* MongoDB
* Mongoose
* Jest
* enzyme
* Axios
* Youtube API
* Travis CI
* Heroku
