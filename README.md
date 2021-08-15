# React-Redux app with Spotify API integration 🎸🎷🎤

This application was built to consume the Spotify API and show information about the logged-in user ,their playlists and the tracks in each playlist.
The user can create a new playlist, remove a track from the selected playlist and add a track to the selected playlist from the search results.

## Set-up the environment
Run `npm install` to install all the npm package dependencies defined in `package.json`.
In the root directory, you will have to create a `.env` file. There you will have to define two environment variables, `REACT_APP_CLIENT_ID` and `REACT_APP_CLIENT_SECRET`, 
to which you will assign the values provided by Spotify for your development application. You can find more information [here](https://developer.spotify.com/documentation/general/guides/app-settings/).

The app opens on `localhost:3000` in the browser. If everything goes well, you should be able to see something like this

![alt text](https://github.com/BilSot/Billy-Spotify/blob/master/screenshots/start-page.png "Start page")
