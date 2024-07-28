import { Link, useRouteLoaderData } from 'react-router-dom';


export default function Home() {
    const token = useRouteLoaderData('root'); // root id 라우트의 로더에서 로드된 데이터에 접근

    return (
        <>
            <div>
                <h1>Add todolist</h1>
                {!token && (
                    <Link to="/auth">
                        login
                    </Link>
                )}
                {token && (
                    <Link to="/todo">
                        add todo
                    </Link>
                )}
            </div>
        </>
    );
}