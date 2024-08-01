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

import { checkAuthLoader, tokenLoader } from './util/auth';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root', //라우트 식별자 id useRouteLoaderData 호출 참고용
    // errorElement: <ErrorPage />,
    loader: tokenLoader, //로컬저장소 살펴보고 토큰추출 로그아웃하면 재평가 후 토큰 삭제
    children: [
      { index: true, element: <Home /> }, //path: '/'
      { path: '/todo', element: <Todo />, loader: checkAuthLoader, }, //그냥 접근 방지. 라우트 보호
      { path: '/insert', element: <Insert />, loader: checkAuthLoader, },
      { path: '/calendar', element: <Calendar />, loader: checkAuthLoader, },
      { path: '/board', element: <Board />, loader: checkAuthLoader, },
      { path: '/addpost', element: <AddPost />, loader: checkAuthLoader, },
      { path: '/board/:postId', element: <PostDetail />, loader: checkAuthLoader, },
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
