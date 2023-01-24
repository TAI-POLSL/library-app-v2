import { Link } from 'react-router-dom';

const AdminTestPage = () => {
    return (
        <section>
            <Link to="/">AdminTestPage - back to home</Link>
            <p>
                <span className="line">
                    <Link to="/create/admin">Create admin account</Link>
                </span>
                <span className="line">
                    <Link to="/create/account">Create employee account</Link>
                </span>
                <span className="line">
                    <Link to="/create/account">Create client account</Link>
                </span>
            </p>
        </section>
    )
}

export default AdminTestPage