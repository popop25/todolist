import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import RootLayout from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Todo from './pages/Todo';
import Insert from './pages/Insert.jsx';
import Calendar from './pages/Calendar.jsx';
import Board from './pages/Board.jsx';
import AddPost from './pages/AddPost.jsx';
import PostDetail from './pages/PostDetail.jsx';
import AuthenticationPage, { action as authAction } from './pages/Authentication.jsx';
import { action as logoutAction } from './pages/Logout';

import TodosContextProvider from './store/todoContext';
import DarkModeProvider from './store/darkModeContext.jsx';
import CalendarProvider from './store/calendarContext';
import BoardContextProvider from './store/boardContext.jsx';

import { tokenLoader } from './util/auth.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root', //라우트 식별자 id useRouteLoaderData 호출 참고용
    // errorElement: <ErrorPage />,
    loader: tokenLoader, //로컬저장소 살펴보고 토큰추출 로그아웃하면 재평가 후 토큰 삭제
    children: [
      { index: true, element: <Home /> }, //path: '/'
      { path: '/todo', element: <Todo /> },
      { path: '/insert', element: <Insert /> },
      { path: '/calendar', element: <Calendar /> },
      { path: '/board', element: <Board /> },
      { path: '/addpost', element: <AddPost /> },
      { path: '/board/:postId', element: <PostDetail /> },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: 'logout',
        action: logoutAction,
      },
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
