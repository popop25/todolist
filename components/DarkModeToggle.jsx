// src/components/DarkModeToggle.jsx
import { useContext } from 'react';
import { DarkModeContext } from '../store/darkModeContext';

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <button
            onClick={toggleDarkMode}
            className="fixed top-4 right-4 px-4 py-2 font-title rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
            {isDarkMode ? '태양모드' : '어둠모드'}
        </button>
    );
}
