import Cookies from 'universal-cookie';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

import axios from '../api/axios';

const ADDBOOK_URL = '/api/1.0.0/library/book';
const SESSION_URL = '/api/1.0.0/library/auth/session';

const AddBookPage = () => {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();

    const [authenticated, setAuthenticated] = useState(() => {
        // Zdalnie
        // try {
        //     var response =  axios.head(SESSION_URL, { withCredentials: true})
        //     return ( response.status === 200)
        // } catch (error) {
        //     return (false);
        // }
        // Lokalnie
        const cookies = new Cookies();
        var res = cookies.get('STORAGE');
        if(res) {
            return true;
        } else {
            return false;
        }
    })

    const [authorFirstName, setAuthorFirstName] = useState('Henryk');
    const [authorLastName, setAuthorLastName] = useState('Sienkiewicz');
    const [title, setTitle] = useState('Potop');
    const [description, setDescription] = useState('Krotki opis');
    const [totalBooks, setTotalBooks] = useState(1);
    const [errMsg, setErrMsg] = useState('');
    const [msg, setMsg] = useState('');

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                ADDBOOK_URL,
                JSON.stringify({ authorFirstName, authorLastName, title, description, totalBooks }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setMsg(`Book created: ${authorFirstName}, ${authorLastName}, ${title}`);
            // navigate(from, { replace: true });
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

    if (authenticated === true) {
        return (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <p ref={errRef} className={msg ? "msg" : "offscreen"} aria-live="assertive">{msg}</p>
                <h1>Add book {authenticated}</h1>
                <form>
                    <label htmlFor="authorFirstName">AuthorFirstName:</label>
                    <input
                        type="text"
                        id="authorFirstName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setAuthorFirstName(e.target.value)}
                        value={authorFirstName}
                        required
                    />

                    <label htmlFor="authorLastName">AuthorLastName:</label>
                    <input
                        type="text"
                        id="authorLastName"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setAuthorLastName(e.target.value)}
                        value={authorLastName}
                        required
                    />

                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />

                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        required
                    />

                    <label htmlFor="totalBooks">TotalBooks:</label>
                    <input
                        type="text"
                        id="totalBooks"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setTotalBooks(e.target.value)}
                        value={totalBooks}
                        required
                    />
                    <button onClick={(e) => { handleSubmit(e) }}>Add book</button>
                </form>
            </section>

        )
    } else if (authenticated === false) {
        return (
            <Navigate to="/" state={{ from: location }} replace /> 
        )
    }

        
    return (
        <div>Loading...</div>
    )
}

export default AddBookPage