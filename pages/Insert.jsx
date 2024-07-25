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
        <>
            <title>Insert Page</title>

            <h1>할일 추가 입력 Insert Page</h1>
            <hr />
            <form method="post" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>INSERT DATA</legend>
                    <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor="contents">할 일(내용) </label></td>
                                <td><input ref={contents} type="text" name="contents" id='contents' required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="deadline">Deadline</label></td>
                                <td><input ref={deadline} type="date" name="deadline" id="deadline" required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="contents">완료여부</label></td>
                                <td><input ref={yesno} type="text" name="yesno" id='yesno' required /></td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" />
                    <Link to="/todo">
                        <button type="button">취소</button>
                    </Link>
                </fieldset>
            </form>

        </>
    );
}