//form은 서버에다 요청보내기
//Form은 클라이언트에 request 보냄
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
import classes from './MainNavigation.module.css';

function MainNavigation() {
    const token = useRouteLoaderData('root'); // root id 라우트의 로더에서 로드된 데이터에 접근

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>

                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    {token && (
                        <li>
                            <NavLink
                                to="/todo"
                                className={({ isActive }) => isActive ? classes.active : undefined}
                            >
                                Todo
                            </NavLink>
                        </li>
                    )}
                    {token && (
                        <li>
                            <NavLink
                                to="/calendar"
                                className={({ isActive }) => isActive ? classes.active : undefined}
                            >
                                Calendar
                            </NavLink>
                        </li>
                    )}
                    {token && (
                        <li>
                            <NavLink
                                to="/board"
                                className={({ isActive }) => isActive ? classes.active : undefined}
                            >
                                Board
                            </NavLink>
                        </li>
                    )}
                    {!token && ( // 로그아웃 상태
                        <li>
                            <NavLink
                                to="/auth"
                                className={({ isActive }) => isActive ? classes.active : undefined}
                            >
                                Authentication
                            </NavLink>
                        </li>
                    )}
                    {token && ( // 로그인 상태
                        <li>
                            <Form action="/logout" method="post">
                                <button>Logout</button>
                            </Form>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
