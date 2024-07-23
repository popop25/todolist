import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import RootLayout from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Todo from './pages/Todo';
import Insert from './pages/Insert.jsx';
import Calendar from './pages/Calendar.jsx';


import TodosContextProvider from './store/todoContext';
import DarkModeProvider from './store/darkModeContext.jsx';
import CalendarProvider from './store/calendarContext';


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
    ],
  },
]);

function App() {
  return (
    <DarkModeProvider>
      <TodosContextProvider>
        <CalendarProvider>
          <RouterProvider router={router} />
        </CalendarProvider>
      </TodosContextProvider>
    </DarkModeProvider>
  );
}

export default App;
