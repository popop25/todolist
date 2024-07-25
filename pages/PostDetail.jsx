import { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BoardContext } from '../store/boardContext';

export default function PostDetail() {
    const { posts, handleDelete, handleEdit } = useContext(BoardContext);
    const { postId } = useParams(); // URL에서 postId 매개변수를 가져옴
    const navigate = useNavigate();

    const post = posts.find(post => post.id === postId); // posts 배열에서 postId와 일치하는 ID 게시글 찾기

    const [isEditing, setIsEditing] = useState(false); //수정모드
    //수정시 제목과 내용 관리
    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');

    // 게시글 삭제
    function handleDeletePost() {
        handleDelete(postId);
        navigate('/board'); // 게시글 목록 페이지로 이동
    }

    // 게시글 수정
    function handleEditPost(event) {
        event.preventDefault(); // 폼 제출 기본 동작 막음
        handleEdit(postId, { title, content });
        setIsEditing(false); // 수정 모드 종료
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
                ) : ( // 수정 중 아님
                    <>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <button onClick={() => setIsEditing(true)}>수정</button>
                        <button onClick={handleDeletePost}>삭제</button>
                    </>
                )}
            </div>
        </>
    );
}
