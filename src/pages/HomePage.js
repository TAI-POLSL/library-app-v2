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
            await axios.delete(
                LOGOUT_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            const cookies = new Cookies();
            cookies.remove('STORAGE', { path: '/' });

            navigate("/login");
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <section>
            <Link to='/test/admin'>Admin pages</Link>
            <Link to='/test/employee'>Employee pages</Link>
            <Link to='/test/table'>Security own View</Link>
            <Link to='/test/books'>Books View</Link>
            <button onClick={handleLogout}>Logout</button>
        </section>
    )
}

export default HomePage