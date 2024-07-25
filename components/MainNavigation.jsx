import { NavLink } from "react-router-dom";
import classes from './MainNavigation.module.css';

function MainNavigation() {
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
                    <li>
                        <NavLink
                            to="/todo"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >
                            Todo
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/calendar"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >
                            Calendar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/board"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                        >
                            Board
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
