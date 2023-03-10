import axios from '../api/axios';
import Cookies from 'universal-cookie';

import { useNavigate, Link } from 'react-router-dom';

const LOGOUT_URL = '/api/1.0.0/library/auth/logout';

const HomePage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const handleLogout = async (e) => {
        e.preventDefault();

        try {
            navigate("/logout");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section>
            <Link to='/test/admin'>Admin pages</Link>
            <Link to='/test/employee'>Employee pages</Link>
            <Link to='/test/books'>Books View</Link>
            <Link to='/test/table'>Security own View</Link>
            <Link to='/test/table/all'>Security all View</Link>
            <Link to='/sessions/active'>Own active sessions</Link>
            <button onClick={handleLogout}>Logout</button>
        </section>
    )
}

export default HomePage