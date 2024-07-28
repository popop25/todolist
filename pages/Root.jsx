import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";


import MainNavigation from "../components/MainNavigation";
import DarkModeToggle from "../components/DarkModeToggle";

import { getTokenDuration } from '../util/auth';


function RootLayout() {
    const token = useLoaderData(); //루트 라우터 렌더링에 있으니 라우트의 로더에서 로드된 데이터에 접근
    const submit = useSubmit();
    // const navigation = useNavigation();
    useEffect(() => {
        if (!token) {
            return;
        }

        //토큰 만료시 로그아웃 실행
        if (token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post' });
            return;
        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);

        //토큰 있으면 타이머 실행됨 한시간후 토큰 삭제
        setTimeout(() => {
            submit(null, { action: '/logout', method: 'post' });
        }, tokenDuration);
    }, [token, submit]); //토큰 변할시 effect함수 구동.

    return (
        <>
            <MainNavigation />
            <DarkModeToggle />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;