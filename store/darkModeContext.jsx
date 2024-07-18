import { createContext, useState, useEffect } from 'react';

export const DarkModeContext = createContext();

export default function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // 로컬 스토리지에서 다크 모드 상태 가져오기
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        // 다크 모드 상태 로컬 스토리지에 저장
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        // body 클래스 다크 모드 클래스를 추가 혹은 삭제
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}