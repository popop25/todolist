import { json, redirect } from 'react-router-dom';

import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
    return <AuthForm />;
}

export default AuthenticationPage;

//로그인 액션 실행
export async function action({ request }) {
    //모드 확인
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    //mode 값 = login or signup 아니면, 422 상태 코드와 JSON 오류 메시지
    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    //폼 데이터 추출. authData 객체에 이메일과 비밀번호 저장
    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    };

    //백엔드 API로 POST 요청 보내 사용자 인증
    //mode에 따라 login or signup
    const response = await fetch('http://localhost:8080/' + mode, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData), //추출된 폼 데이터 보냄
    });

    //백에서 오류 보내면 오류 메시지 띄움
    if (response.status === 422 || response.status === 401) {
        return response;
    }
    if (!response.ok) {
        throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    }

    //응답 데이터 JSON 형식으로 파싱하여 토큰 추출
    const resData = await response.json();
    const token = resData.token;

    localStorage.setItem('token', token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); //토큰 유효시간 한시간 설정
    localStorage.setItem('expiration', expiration.toISOString()); //표준화시간으로 바꿈. 로컬저장소에 만료날짜 저장

    return redirect('/');
}
