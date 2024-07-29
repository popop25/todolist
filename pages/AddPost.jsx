import { useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BoardContext } from '../store/boardContext';


export default function AddPost() {
    const { addPost } = useContext(BoardContext);
    const navigate = useNavigate();
    const titleRef = useRef();
    const contentRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        // 입력 제목 내용 참조
        const post = {
            title: titleRef.current.value,
            content: contentRef.current.value,
        };
        addPost(post);
        navigate('/board'); // 게시글 추가 후 게시판 이동
    }

    return (
        <>
            <div>
                <h1>게시글 작성</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">제목</label>
                        <input ref={titleRef} type="text" id="title" required />
                    </div>
                    <div>
                        <label htmlFor="content">내용</label>
                        <textarea ref={contentRef} id="content" required />
                    </div>
                    <button type="submit">올리기</button>
                    <Link to="/board">
                        <button type="button">돌아가기</button>
                    </Link>
                </form>
            </div>
        </>
    );
}
