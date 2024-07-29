import { createContext, useState, useEffect } from 'react';

export const BoardContext = createContext({
    posts: [],
    addPost: () => { },
    handleEdit: () => { },
    handleDelete: () => { },
    handleAddComment: () => { },
    handleEditComment: () => { },
    handleDeleteComment: () => { },
});

export default function BoardContextProvider({ children }) {
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem('posts');
        const parsedPosts = savedPosts ? JSON.parse(savedPosts) : [];
        return parsedPosts.map(post => ({
            ...post,
            comments: post.comments || [], // useState 초기화 시 모든 게시물에 comments 배열을 추가
        }));
    });

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]); //posts 변경될 때 로컬 스토리지에 저장

    // 게시글 추가
    function addPost(post) {
        const newId = Math.random().toString();
        setPosts(prevPosts => [
            { ...post, id: newId, comments: [] }, // 새 게시글 comments 배열 추가
            ...prevPosts,
        ]);
    }

    // 게시글 수정
    function handleEdit(postId, updatedPost) {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId ? { ...post, ...updatedPost } : post
            )
        );
    }

    // 게시글 삭제
    function handleDelete(postId) {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    }

    // 댓글 추가
    function handleAddComment(postId, comment) {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId //post id 일치 확인
                    ? { ...post, comments: [...post.comments, comment] } //댓 배열에 추가
                    : post //일치x 그냥 반환
            )
        );
    }

    // 댓글 수정
    function handleEditComment(postId, commentId, updatedComment) {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.map(comment =>
                            comment.id === commentId
                                ? { ...comment, ...updatedComment }
                                : comment
                        ),
                    }
                    : post
            )
        );
    }

    // 댓글 삭제
    function handleDeleteComment(postId, commentId) {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        comments: post.comments.filter(comment => comment.id !== commentId),
                    }
                    : post
            )
        );
    }

    const boardContext = {
        posts,
        addPost,
        handleEdit,
        handleDelete,
        handleAddComment,
        handleEditComment,
        handleDeleteComment,
    };

    return (
        <BoardContext.Provider value={boardContext}>
            {children}
        </BoardContext.Provider>
    );
}
