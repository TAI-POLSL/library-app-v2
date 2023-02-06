import Cookies from 'universal-cookie';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

import axios from '../api/axios';

const DELETEBOOK_URL = '/api/1.0.0/library/book/{Id}';

const DeleteBookPage = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const [authenticated, setAuthenticated] = useState(false)

    const [user, setUser] = useState('');
    const [bookId, setBookId] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const from = location.state?.from?.pathname || "/";

    const createLocalSessionCookie = async (username, role) => {
        const cookies = new Cookies();
        cookies.set('STORAGE', JSON.stringify({ username: username, role: role }), { path: '/' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(
                DELETEBOOK_URL,
                JSON.stringify({ id: bookId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const role = response?.data;
            createLocalSessionCookie(user, role)
            setUser('');
            setBookId('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data);
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            console.log(err)
            errRef.current.focus();
        }
    }

    return (
        <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Delete book {authenticated}</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="bookId">Book Id:</label>
            <input
                type="text"
                id="bookId"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setBookId(e.target.value)}
                value={bookId}
                required
            />
            <button onClick={() => { navigate('/deletebook') }}>Add book</button>
        </form>
    </section>

    )
}

export default DeleteBookPage;