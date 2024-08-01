import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BoardContext } from '../store/boardContext';

export default function Board() {
    const { posts } = useContext(BoardContext);

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Board</h1>
            <div className="mb-6 text-right">
                <Link to="/addpost">
                    <button
                        type="button"
                        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        게시글 작성
                    </button>
                </Link>
            </div>
            <ul className="space-y-4">
                {posts.map(post => (
                    <li key={post.id} className="bg-white p-4 rounded-lg shadow hover:bg-gray-200">
                        {/* block써서 링크가 전체 li를 차지 */}
                        <Link to={`/board/${post.id}`} className="block text-blue-500 hover:underline">
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
