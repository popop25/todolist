import { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BoardContext } from '../store/boardContext';

export default function PostDetail() {
    const {
        posts,
        handleDelete,
        handleEdit,
        handleAddComment,
        handleEditComment,
        handleDeleteComment
    } = useContext(BoardContext);
    const { postId } = useParams(); // URL에서 postId 매개변수를 가져옴
    const navigate = useNavigate();

    // 게시글이 존재하는지 확인
    const post = posts.find(post => post.id === postId); // posts 배열에서 postId와 일치하는 ID 게시글 찾기

    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    // 수정 시 제목과 내용 관리
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');

    // 댓글 내용 및 수정 상태 관리
    const [commentContent, setCommentContent] = useState('');
    const [isCommentEditing, setIsCommentEditing] = useState(false);
    const [currentCommentId, setCurrentCommentId] = useState(null);

    // 게시글 삭제
    function handleDeletePost() {
        handleDelete(postId);
        navigate('/board'); // 게시글 목록 페이지로 이동
    }

    // 게시글 수정
    function handleEditPost(event) {
        event.preventDefault(); // 폼 제출 막음
        handleEdit(postId, { title, content });
        setIsEditing(false); // 수정 모드 종료
    }

    // 댓글 추가
    function handleAddNewComment(event) {
        event.preventDefault();
        const newComment = {
            id: Math.random().toString(), // 댓글 ID 생성
            content: commentContent,
        };
        handleAddComment(postId, newComment);
        setCommentContent(''); // 댓글 입력 필드 초기화
    }

    // 댓글 수정
    function handleEditCommentSubmit(event) {
        event.preventDefault();
        handleEditComment(postId, currentCommentId, { content: commentContent });
        setCommentContent(''); // 댓글 입력 필드 초기화
        setIsCommentEditing(false); // 댓글 수정 모드 종료
        setCurrentCommentId(null); // 수정 중인 댓글 ID 초기화
    }

    // 댓글 수정 클릭 시 처리
    function handleEditCommentClick(commentId, content) {
        setIsCommentEditing(true);
        setCurrentCommentId(commentId);
        setCommentContent(content);
    }

    // 댓글 수정 취소 시 처리
    function handleCancelEditComment() {
        setIsCommentEditing(false);
        setCurrentCommentId(null);
        setCommentContent('');
    }

    // 게시글 없음
    if (!post) {
        return <p className="text-center text-red-500">게시글을 찾을 수 없습니다.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {isEditing ? ( // 수정 중일 때
                <form onSubmit={handleEditPost} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} // 제목 변경
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)} // 내용 변경
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                        >
                            저장
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
                        >
                            취소
                        </button>
                    </div>
                </form>
            ) : ( // 수정 중이 아닐 때
                <>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                        <p className="text-gray-700">{post.content}</p>
                        <div className="mt-4 space-x-4">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                            >
                                수정
                            </button>
                            <button
                                onClick={handleDeletePost}
                                className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">댓글</h2>
                        <form
                            onSubmit={isCommentEditing ? handleEditCommentSubmit : handleAddNewComment}
                            className="space-y-4"
                        >
                            <textarea
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                                >
                                    {isCommentEditing ? '수정' : '추가'}
                                </button>
                                {isCommentEditing && (
                                    <button
                                        type="button"
                                        onClick={handleCancelEditComment}
                                        className="py-2 px-4 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
                                    >
                                        취소
                                    </button>
                                )}
                            </div>
                            <Link to="/board">
                                <button
                                    type="button"
                                    className="py-2 px-4 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
                                >
                                    돌아가기
                                </button>
                            </Link>
                        </form>
                        <ul className="mt-4 space-y-2">
                            {post.comments.map((comment) => (
                                <li key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                    <p className="text-gray-800">{comment.content}</p>
                                    <div className="mt-2 space-x-4">
                                        <button
                                            onClick={() => handleEditCommentClick(comment.id, comment.content)}
                                            className="py-1 px-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
                                        >
                                            수정
                                        </button>
                                        <button
                                            onClick={() => handleDeleteComment(postId, comment.id)}
                                            className="py-1 px-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
}
