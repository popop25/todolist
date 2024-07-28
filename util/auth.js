import { redirect } from 'react-router-dom';

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime(); //잔여 유효기간
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');

    //토큰 없으면 undefined 반환. 유효시간 확인ㄴㄴ
    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();

    //토큰만료
    if (tokenDuration < 0) {
        return 'EXPIRED';
    }

    return token;
}

//토큰 호출
export function tokenLoader() {
    const token = getAuthToken();
    return token;
}

//라우트 호출. 토큰 없을시 redirect시킴
export function checkAuthLoader() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth');
    }

    return null;
}