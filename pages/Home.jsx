import { Link, useRouteLoaderData } from 'react-router-dom';

export default function Home() {
    const token = useRouteLoaderData('root'); // root id 라우트의 로더에서 로드된 데이터에 접근

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-1/4 p-6 bg-gray-100 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Add Todolist</h1>
                {!token ? (
                    <Link
                        to="/auth"
                        className="block w-full py-2 px-4 text-center text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Login
                    </Link>
                ) : (
                    <Link
                        to="/todo"
                        className="block w-full py-2 px-4 text-center text-white bg-green-500 rounded hover:bg-green-700 transition duration-300"
                    >
                        Add Todo
                    </Link>
                )}
            </div>
        </div>
    );
}
