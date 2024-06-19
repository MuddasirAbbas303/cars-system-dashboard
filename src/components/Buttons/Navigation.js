import React from 'react';

const NavigationButton = ({isCars}) => {
    return (
        <button
            onClick={() => {
                window.location.href = !isCars ? '/cars' : '/categories';
            }}
            className="px-4 py-1 bg-teal-500 text-white rounded"
        >
            {!isCars ? 'Cars' : 'Categories'}
        </button>
    );
};

export default NavigationButton;
