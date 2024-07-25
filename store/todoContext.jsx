import { createContext, useState, useEffect } from 'react';

export const TodosContext = createContext({
    datalist: [],
    handleAdd: () => { },
    handleEdit: () => { },
    handleDelete: () => { },
});

export default function TodosContextProvider({ children }) {
    const [datalist, setDatalist] = useState(() => {
        // 로컬 스토리지 데이터 가져오기
        const savedTodos = localStorage.getItem('datalist');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    useEffect(() => { //datalist 변경 내용
        localStorage.setItem('datalist', JSON.stringify(datalist)); //로컬스토리지 저장
        console.log('datalist변경')
    }, [datalist]);

    function handleAdd(todo) {
        //const newId = datalist.length + 1;
        setDatalist((prevTodos) => [
            { ...todo, id: Math.random().toString(), status: 'no' },//id랜덤부여
            //{ ...todo, id: newId.toString(), status: 'no' }, 1,2,3 id 부여. 중복현상발생
            ...prevTodos,
        ]);
        console.log('todo added:', todo);
    }

    function handleEdit(id) {
        const updatedList = datalist.map(item =>
            item.id === id ? { ...item, yesno: item.yesno === 'yes' ? 'no' : 'yes' } : item
        );
        setDatalist(updatedList);
    };

    function handleDelete(id) {
        const updatedList = datalist.filter(item => item.id !== id);
        setDatalist(updatedList);
    };

    const todosContext = {
        datalist,
        handleAdd,
        handleDelete,
        handleEdit,
    };

    return (
        <TodosContext.Provider value={todosContext}>
            {children}
        </TodosContext.Provider>
    );
}