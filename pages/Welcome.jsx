//import { useContext } from 'react';
import { Link } from 'react-router-dom';

//import { TodosContext } from '../store/todoContext';

export default function Welcome() {
    //const { isDarkMode, toggleDarkMode } = useContext(TodosContext);

    return (
        <>
            <header>
                <div>
                    <h1>Add todolist</h1>
                    {/* <button onClick={toggleDarkMode}/> */}
                    <Link to="/todo">
                        Get Started
                    </Link>
                </div>
            </header>
            <main>
                
                {/* <section>
                    <h2>There&apos;s never been a better time.</h2>
                    <p>
                        With our platform, you can set, track, and conquer challenges at
                        your own pace. Whether it&apos;s personal growth, professional
                        achievements, or just for fun, we&apos;ve got you covered.
                    </p>
                </section>

                <section>
                    <h2>Why Challenge Yourself?</h2>
                    <p>
                        Challenges provide a framework for growth. They push boundaries,
                        test limits, and result in genuine progress. Here, we believe
                        everyone has untapped potential, waiting to be unlocked.
                    </p>
                </section>

                <section>
                    <h2>Features</h2>
                    <ul>
                        <li>Custom challenge creation: Set the rules, define your pace.</li>
                        <li>
                            Track your progress: See your growth over time with our analytics
                            tools.
                        </li>
                        <li>
                            Community Support: Join our community and get motivated by peers.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Join Thousands Embracing The Challenge</h2>
                    <p>
                        “I never realized what I was capable of until I set my first
                        challenge here. It&apos;s been a transformative experience!” - Alex
                        P.
                    </p>
                </section> */}
            </main>
        </>
    );
}