import React from 'react';

const Login = () => {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
    const scopes = [
        "user-top-read",
    ];

    return (
        <div className="container text-center">
            <h1>Spotify Top Artists and Tracks</h1>
            <a
                className="btn btn-success"
                href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    "%20"
                )}&response_type=token&show_dialog=true`}
            >
                Log in to Spotify
            </a>
        </div>
    );
};

export default Login;
