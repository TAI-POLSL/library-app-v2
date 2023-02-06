import Cookies from 'universal-cookie';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

import axios from '../api/axios';

const LOGIN_URL = '/api/1.0.0/library/auth/login';
const SESSION_URL = '/api/1.0.0/library/auth/session';

const LoginPage = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const [authenticated, setAuthenticated] = useState(false)

    const [user, setUser] = useState('ADMIN');
    const [pwd, setPwd] = useState('ADMIN_ROOT');
    const [errMsg, setErrMsg] = useState('');

    const from = location.state?.from?.pathname || "/";

    const isAuthenticated = useCallback(async () => {
        try {
            var response = await axios.head(SESSION_URL, { withCredentials: true})
            return setAuthenticated( response.status === 200)
        } catch (error) {
            return  setAuthenticated(false);
        }
    }, [])

    useEffect(()  => {
        setErrMsg('');
        isAuthenticated();
    }, [user, pwd, isAuthenticated])

    const createLocalSessionCookie = async(username, role) => {
        const cookies = new Cookies();
        cookies.set('STORAGE', JSON.stringify({ username: username, role: role }), { path: '/' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const role = response?.data;
            createLocalSessionCookie(user, role)
            setUser('');
            setPwd('');
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
        authenticated === true ? <Navigate to="/" state={{ from: location }} replace /> :
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In {authenticated} (jeśli strona źle się otwiera wyczyść cookie)</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>

    )
}

export default LoginPage