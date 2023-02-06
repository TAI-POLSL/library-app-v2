import { Link } from 'react-router-dom';

const AdminTestPage = () => {
    return (
        <section>
            <Link to="/">AdminTestPage - back to home</Link>
            <p>
                <span className="line">
                    <Link to="/create">Create user account</Link>
                </span>
                <span className="line">
                    <Link to="/tableusers">Close user account</Link>
                </span>
            </p>
        </section>
    )
}

export default AdminTestPage