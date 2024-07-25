import { createContext, useState, useEffect } from 'react';

export const BoardContext = createContext({
    posts: [],
    addPost: () => { },
    handleEdit: () => { },
    handleDelete: () => { },
});

export default function BoardContextProvider({ children }) {
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        return savedPosts ? JSON.parse(savedPosts) : [];
    });

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    function addPost(post) {
        const newId = Math.random().toString();
        setPosts(prevPosts => [
            { ...post, id: newId.toString() },
            ...prevPosts,
        ]);
    }

    function handleEdit(postId, updatedPost) {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId ? { ...post, ...updatedPost } : post
            )
        );
    }

    function handleDelete(postId) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }

    const boardContext = {
        posts,
        addPost,
        handleEdit,
        handleDelete,
    };

    return (
        <BoardContext.Provider value={boardContext}>
            {children}
        </BoardContext.Provider>
    );
}
