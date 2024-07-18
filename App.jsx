import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Welcome from './pages/Welcome.jsx';
import Todo from './pages/Todo';
import Insert from './pages/Insert.jsx';

import DarkModeToggle from './components/DarkModeToggle.jsx';
import Calendar from './components/Calendar.jsx';

import TodosContextProvider from './store/todoContext';  // TodosContextProvider를 가져옴
import DarkModeProvider from './store/darkModeContext.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Welcome /> },
  { path: '/todo', element: <Todo /> },
  { path: '/insert', element: <Insert /> },
]);

function App() {
  return (
    <>
      <DarkModeProvider>
        <TodosContextProvider>
          <DarkModeToggle />
          <RouterProvider router={router} />
          {/* <Calendar /> */}
        </TodosContextProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
