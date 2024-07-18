// src/components/DarkModeToggle.jsx
import { useContext } from 'react';
import { DarkModeContext } from '../store/darkModeContext';

export default function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <button onClick={toggleDarkMode} style={{ position: 'fixed', top: 10, right: 10 }}>
            {isDarkMode ? '태양모드' : '어둠모드'}
        </button>
    );
}
