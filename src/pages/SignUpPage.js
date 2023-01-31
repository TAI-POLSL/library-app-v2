import Cookies from 'universal-cookie';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

import axios from '../api/axios';

const ACCOUNT_URL = '/api/1.0.0/library/account';

const SignUpPage = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const [authenticated, setAuthenticated] = useState(false)

    const [user, setUser] = useState('CLIENT');
    const [pwd, setPwd] = useState('CLIENT_ROOT');
    const [confirmPassword, setConfirmPassword] = useState('CLIENT_ROOT');
    const [firstName, setFirstName] = useState('Tomasz');
    const [lastName, setLastName] = useState('Depczynski');
    const [gender, setGender] = useState(0);
    const [roles, setRoles] = useState('CLIENT');
    const [email, setEmail] = useState('t.depczynski@gmail.com');
    const [streetAddress, setStreetAddress] = useState('Witkiewicza');
    const [postalCode, setPostalCode] = useState('44102');
    const [city, setCity] = useState('Gliwice');
    const [state, setState] = useState('Slask');
    const [errMsg, setErrMsg] = useState('');

    const from = location.state?.from?.pathname || "/";

    const createLocalSessionCookie = async (username, role) => {
        const cookies = new Cookies();
        cookies.set('STORAGE', JSON.stringify({ username: username, role: role }), { path: '/' });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                ACCOUNT_URL,
                JSON.stringify({ username: user, password: pwd, confirmPassword, firstName, lastName, gender, roles, email, streetAddress, postalCode, city, state }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const role = response?.data;
            createLocalSessionCookie(user, role)
            setUser('');
            setPwd('');
            setConfirmPassword('');
            setFirstName('');
            setLastName('');
            setGender('');
            setRoles('');
            setEmail('');
            setStreetAddress('');
            setPostalCode('');
            setCity('');
            setState('');
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
        authenticated === true ? <Navigate to="/login" state={{ from: location }} replace /> :
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In {authenticated}</h1>
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

                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input
                        type="text"
                        id="confirmPassword"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />

                    <label htmlFor="firstName">First name:</label>
                    <input
                        type="text"
                        id="firstName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                        required
                    />

                    <label htmlFor="lastName">Last name:</label>
                    <input
                        type="text"
                        id="lastName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                    />

                    <label htmlFor="gender">Gender:</label>
                    <input
                        type="text"
                        id="gender"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setGender(e.target.value)}
                        value={gender}
                        required
                    />

                    <label htmlFor="roles">Roles:</label>
                    <input
                        type="text"
                        id="roles"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setRoles(e.target.value)}
                        value={roles}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="streetAddress">Street address:</label>
                    <input
                        type="text"
                        id="streetAddress"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setStreetAddress(e.target.value)}
                        value={streetAddress}
                        required
                    />

                    <label htmlFor="postalCode">Postal code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setPostalCode(e.target.value)}
                        value={postalCode}
                        required
                    />

                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setCity(e.target.value)}
                        value={city}
                        required
                    />

                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setState(e.target.value)}
                        value={state}
                        required
                    />
                    <button>Sign Up</button>
                </form>
            </section>

    )
}

export default SignUpPage;