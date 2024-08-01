import { useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BoardContext } from '../store/boardContext';
import Modal from '../components/Modal';

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
        <Modal>
            <h1 className="text-2xl font-bold mb-4">게시글 작성</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
                    <input 
                        ref={titleRef} 
                        type="text" 
                        id="title" 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">내용</label>
                    <textarea 
                        ref={contentRef} 
                        id="content" 
                        required 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <button 
                        type="submit" 
                        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        올리기
                    </button>
                    <Link to="/board">
                        <button 
                            type="button" 
                            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                        >
                            돌아가기
                        </button>
                    </Link>
                </div>
            </form>
        </Modal>
    );
}
