import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BoardContext } from '../store/boardContext';

export default function Board() {
    const { posts } = useContext(BoardContext);

    return (
        <>
            <div>
                <h1>Board</h1>
                <Link to="/addpost">
                    <button>게시글 작성</button>
                </Link>
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <Link to={`/board/${post.id}`}>
                                {post.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
