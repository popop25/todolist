import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TodosContext } from '../store/todoContext';

export default function Todo() {
    const { datalist, handleEdit, handleDelete } = useContext(TodosContext);

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
            <div className="mb-6 text-right">
                <Link to="/insert">
                    <button
                        type="button"
                        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    >
                        추가
                    </button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <div className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal grid grid-cols-5">
                        <div className="py-3 px-6 text-left">내용</div>
                        <div className="py-3 px-6 text-left">마감일</div>
                        <div className="py-3 px-6 text-left">완료여부</div>
                        <div className="py-3 px-6 text-left">수정처리</div>
                        <div className="py-3 px-6 text-left">삭제</div>
                    </div>
                    <div className="text-gray-600 text-sm font-light">
                        {datalist.map((item, index) => (
                            <div key={index} className="border-b border-gray-200 hover:bg-gray-100 grid grid-cols-5">
                                <div className="py-3 px-6 text-left whitespace-nowrap">{item.contents}</div>
                                <div className="py-3 px-6 text-left">{item.deadline}</div>
                                <div className="py-3 px-6 text-left">{item.yesno}</div>
                                <div className="py-3 px-6 text-left">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(item.id)}
                                        className="py-1 px-3 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
                                    >
                                        {item.yesno === 'yes' ? '변경' : '수정'}
                                    </button>
                                </div>
                                <div className="py-3 px-6 text-left">
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(item.id)}
                                        className="py-1 px-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
