import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

function AuthForm() {
    const data = useActionData(); //에러 리턴될때 받음
    const navigation = useNavigation();

    const [searchParams] = useSearchParams(); //쿼리 매개변수 접근
    const isLogin = searchParams.get('mode') === 'login'; //로그인 회원가입 모드 전환
    const isSubmitting = navigation.state === 'submitting';

    return (
        <>
            <Form method="post">
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                {data && data.errors && ( //리턴된 에러 내용 출력
                    <ul>
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required />
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" required />
                </p>
                <div>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Create new user' : 'Login'}
                    </Link>
                    {/* 전송중이면 활성화 전송후 redirect*/}
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting' : 'Save'}
                    </button>
                </div>
            </Form >
        </>
    );
}

export default AuthForm;
