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
        return <p>게시글을 찾을 수 없습니다.</p>;
    }

    return (
        <>
            <div>
                {isEditing ? ( // 수정 중일 때
                    <form onSubmit={handleEditPost}>
                        <div>
                            <label htmlFor="title">제목</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} // 제목 변경
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content">내용</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)} // 내용 변경
                                required
                            />
                        </div>
                        <button type="submit">저장</button>
                        <button type="button" onClick={() => setIsEditing(false)}>취소</button>
                    </form>
                ) : ( // 수정 중이 아닐 때
                    <>
                        <div>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                            <button onClick={() => setIsEditing(true)}>수정</button>
                            <button onClick={handleDeletePost}>삭제</button>
                        </div>
                        <div>
                            <h2>댓글</h2>
                            <form onSubmit={isCommentEditing ? handleEditCommentSubmit : handleAddNewComment}>
                                <textarea
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    required
                                />
                                <button type="submit">{isCommentEditing ? '수정' : '추가'}</button>
                                {isCommentEditing && <button type="button" onClick={handleCancelEditComment}>취소</button>}
                                <Link to="/board">
                                    <button type="button">돌아가기</button>
                                </Link>
                            </form>

                            <ul>
                                {post.comments.map((comment) => (
                                    <li key={comment.id}>
                                        <p>{comment.content}</p>
                                        <button onClick={() => handleEditCommentClick(comment.id, comment.content)}>수정</button>
                                        <button onClick={() => handleDeleteComment(postId, comment.id)}>삭제</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
