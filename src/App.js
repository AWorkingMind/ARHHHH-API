import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Callback from './components/callback';

const App = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(window.localStorage.getItem('token'));
    }, []);

    const handleLogout = () => {
        setToken('');
        window.localStorage.removeItem('token');
    };

    return (
        <div className="container mt-5">
            {!token ? (
                <Login />
            ) : (
                <>
                    <button className="btn btn-danger mb-3" onClick={handleLogout}>
                        Log Out
                    </button>
                    <h2>My Top Artists and Tracks</h2>
                    <TopItems token={token} />
                </>
            )}
            <Routes>
                <Route path="/callback" element={<Callback />} />
            </Routes>
        </div>
    );
};

const TopItems = ({ token }) => {
    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data: artistsData } = await axios.get('https://api.spotify.com/v1/me/top/artists', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setArtists(artistsData.items);

            const { data: tracksData } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTracks(tracksData.items);
        };

        fetchData();
    }, [token]);

    return (
        <div>
            <h3>Top Artists</h3>
            <ul className="list-group">
                {artists.map((artist) => (
                    <li key={artist.id} className="list-group-item">
                        {artist.name}
                    </li>
                ))}
            </ul>
            <h3 className="mt-4">Top Tracks</h3>
            <ul className="list-group">
                {tracks.map((track) => (
                    <li key={track.id} className="list-group-item">
                        {track.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
