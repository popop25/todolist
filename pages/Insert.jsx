import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { TodosContext } from '../store/todoContext';

export default function Insert() {
    const { handleAdd } = useContext(TodosContext);
    const navigate = useNavigate();

    const contents = useRef();
    const deadline = useRef();
    const yesno = useRef();

    function handleSubmit(event) {
        event.preventDefault();  // 폼 제출 막음.
        const todo = {
            contents: contents.current.value,
            deadline: deadline.current.value,
            yesno: yesno.current.value,
        };
        handleAdd(todo);
        navigate('/todo');
    }

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">할일 추가 입력 Insert Page</h1>
            <hr className="mb-6" />
            <form method="post" onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label htmlFor="contents" className="block text-sm font-medium text-gray-700">할 일(내용)</label>
                    <input
                        ref={contents}
                        type="text"
                        name="contents"
                        id="contents"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                    <input
                        ref={deadline}
                        type="date"
                        name="deadline"
                        id="deadline"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="yesno" className="block text-sm font-medium text-gray-700">완료여부</label>
                    <input
                        ref={yesno}
                        type="text"
                        name="yesno"
                        id="yesno"
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        저장
                    </button>
                    <Link to="/todo">
                        <button
                            type="button"
                            className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                        >
                            취소
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
