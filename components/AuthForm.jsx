import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

function AuthForm() {
    const data = useActionData(); // 에러 리턴될 때 받음
    const navigation = useNavigation();

    const [searchParams] = useSearchParams(); // 쿼리 매개변수 접근
    const isLogin = searchParams.get('mode') === 'login'; // 로그인 회원가입 모드 전환
    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <Form method="post" className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Log in' : 'Create a new user'}</h1>
                {data && data.errors && ( // 리턴된 에러 내용 출력
                    <ul className="mb-4 text-red-600">
                        {Object.values(data.errors).map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                )}
                {data && data.message && <p className="mb-4 text-red-600">{data.message}</p>}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <Link
                        to={`?mode=${isLogin ? 'signup' : 'login'}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                    >
                        {isLogin ? 'Create new user' : 'Login'}
                    </Link>
                    {/* 전송중이면 활성화 전송후 redirect*/}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {isSubmitting ? 'Submitting' : 'Save'}
                    </button>
                </div>
            </Form>
        </div>
    );
}

export default AuthForm;
