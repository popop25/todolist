import { redirect } from "react-router-dom";

//인증상태에 따른 ui업데이트
//로그아웃 액션 실행
export function action() {
    localStorage.removeItem('token'); //토큰삭제
    localStorage.removeItem('expiration');
    return redirect('/');
}