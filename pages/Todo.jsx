import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { TodosContext } from '../store/todoContext';

export default function Todo() {
    const { datalist, handleEdit, handleDelete } = useContext(TodosContext);

    return (
        <div className="container">
            <h1>Todo List</h1>
            <Link to="/insert">
                <button type="button">추가</button>
            </Link>

            <table>
                <thead>
                    <tr>
                        <th>내용</th>
                        <th>마감일</th>
                        <th>완료여부</th>
                        <th>수정처리</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {datalist.map((item, index) => (
                        <tr key={index}>
                            <td>{item.contents}</td>
                            <td>{item.deadline}</td>
                            <td>{item.yesno}</td>
                            <td>
                                {item.yesno === 'yes' ? (
                                    <button type="button" onClick={() => handleEdit(item.id)}>변경</button>
                                ) : (
                                    <button type="button" onClick={() => handleEdit(item.id)}>수정</button>
                                )}
                            </td>
                            <td>
                                <button type="button" onClick={() => handleDelete(item.id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
