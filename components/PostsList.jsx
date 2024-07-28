import { Link } from 'react-router-dom';

function EventsList({ events }) {

    return (
        <div>
            <h1>All Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <Link to={`/posts/${event.id}`}>
                            <img src={event.image} alt={event.title} />
                            <div className={classes.content}>
                                <h2>{event.title}</h2>
                                <time>{event.date}</time>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventsList;
