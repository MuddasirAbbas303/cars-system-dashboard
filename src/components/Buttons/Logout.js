import React from 'react';

const LogoutButton = () => {

    return (
        <button
            onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/signin';
            }}
            className="px-4 py-1 bg-red-500 text-white rounded"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
