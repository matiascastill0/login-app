import React, { useState, useEffect } from 'react';

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

const MePage = ({ user_data }) => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Extract the token from the user_data
        const token = user_data.split('Token: ')[1];
        console.log(token)

        if (token) {
            // Use the token to make an authorized fetch request to /me
            const fetchProfile = async () => {
                try {
                    const response = await fetch(`${backendUrl}/users/me`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setProfile(data);
                    } else {
                        setError('Failed to fetch profile.');
                    }
                } catch (err) {
                    setError(err.message);
                }
            };

            fetchProfile();
        }
    }, [user_data]);

    if (!profile) {
        return <div>{error ? `Error: ${error}` : 'Loading profile...'}</div>;
    }

    // Display user's profile
    return (
        <div>
            <h3>Profile</h3>
            <p>Username: {profile.username}</p>
            {/* Add other profile fields here */}
        </div>
    );
};

export default MePage;
