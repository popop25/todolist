import { createContext, useState } from 'react';

export const PostsContext = createContext({
    posts: [],
    addPost: () => { },
    deletePost: () => { },
    updatePostStatus: () => { },
});

export default function PostsContextProvider({ children }) {
    const [posts, setPosts] = useState([]);

    function addPost(post) {
        setPosts((prevPosts) => [
            { ...post, id: Math.random().toString(), status: 'active' },
            ...prevPosts,
        ]);
    }

    function deletePost(postId) {
        setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
        );
    }

    function updatePostStatus(postId, newStatus) {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    return { ...post, status: newStatus };
                }
                return post;
            })
        );
    }

    const postsContext = {
        posts,
        addPost,
        deletePost,
        updatePostStatus,
    };

    return (
        <PostsContext.Provider value={postsContext}>
            {children}
        </PostsContext.Provider>
    );
}
