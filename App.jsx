import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import RootLayout from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Todo from './pages/Todo';
import Insert from './pages/Insert.jsx';
import Calendar from './pages/Calendar.jsx';
import Board from './pages/Board.jsx';
import AddPost from './pages/AddPost.jsx';
import PostDetail from './pages/PostDetail.jsx';

import TodosContextProvider from './store/todoContext';
import DarkModeProvider from './store/darkModeContext.jsx';
import CalendarProvider from './store/calendarContext';
import BoardContextProvider from './store/boardContext.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> }, //path: '/'
      { path: '/todo', element: <Todo /> },
      { path: '/insert', element: <Insert /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/board', element: <Board /> },
      { path: '/addpost', element: <AddPost /> },
      { path: '/board/:postId', element: <PostDetail /> },
    ],
  },
]);

function App() {
  return (
    <DarkModeProvider>
      <BoardContextProvider>
        <TodosContextProvider>
          <CalendarProvider>
            <RouterProvider router={router} />
          </CalendarProvider>
        </TodosContextProvider>
      </BoardContextProvider>
    </DarkModeProvider>
  );
}

export default App;
