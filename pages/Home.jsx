import { Link } from 'react-router-dom';


export default function Home() {


    return (
        <>
                <div>
                    <h1>Add todolist</h1>
                    <Link to="/todo">
                        Get Started
                    </Link>
                </div>
        </>
    );
}