// import Cookies from 'universal-cookie';
// import { useRef, useState, useEffect, useCallback } from 'react';
// import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

// import axios from '../api/axios';

// const DELETEUSER_URL = '/api/1.0.0/library/account/{userId}/close';

// const DeleteUser = () => {
//     const userRef = useRef();
//     const errRef = useRef();
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [authenticated, setAuthenticated] = useState(false)

//     const [user, setUser] = useState('');
//     const [userId, setUserId] = useState('');
//     const [errMsg, setErrMsg] = useState('');

//     const from = location.state?.from?.pathname || "/";

//     const createLocalSessionCookie = async (username, role) => {
//         const cookies = new Cookies();
//         cookies.set('STORAGE', JSON.stringify({ username: username, role: role }), { path: '/' });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.delete(
//                 DELETEUSER_URL,
//                 JSON.stringify({ userId }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             const role = response?.data;
//             createLocalSessionCookie(user, role)
//             setUser('');
//             navigate(from, { replace: true });
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 400) {
//                 setErrMsg(err.response.data);
//             } else if (err.response?.status === 401) {
//                 setErrMsg('Unauthorized');
//             } else {
//                 setErrMsg('Login Failed');
//             }
//             console.log(err)
//             errRef.current.focus();
//         }
//     }

//     return (
//             <section>
//                 <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                 <h1>Sign In {authenticated}</h1>
//                 <form onSubmit={handleSubmit}>
//                     <label htmlFor="userId">UserId:</label>
//                     <input
//                         type="text"
//                         id="userId"
//                         ref={userRef}
//                         autoComplete="off"
//                         onChange={(e) => setUserId(e.target.value)}
//                         value={userId}
//                         required
//                     />
//                     <button>Delete</button>
//                 </form>
//             </section>

//     )
// }

// export default DeleteUser;

import Cookies from 'universal-cookie';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';

import axios from '../api/axios';

const DeleteUserPage = () => {
    const navigate = useNavigate();

    const [fetch, setFetch] = useState(null)

    const renderItems = (arr) => {
        if(arr)
        {
            return arr.map((item, i) => {
                return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.authorFirstName}</td>
                    <td>{item.authorLastName}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                </tr>
                );
            });
        }
    }

    return (
        <section style={{minWidth: 'calc(100vw - 75px)', height: 'calc(100vh - 75px)', overflow: 'hidden'}}>
            <h1>Books table</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>AuthorFirstName</td>
                        <td>AuthorLastName</td>
                        <td>Title</td>
                        <td>Description</td>
                    </tr>
                </thead>

                <tfoot>
                    <tr>
                        <td colspan="4">
                            <button onClick={() => { navigate('/addbook') }}>Add</button>
                            <button onClick={() => { navigate('/deletebook') }}>Delete</button>
                        </td>
                    </tr>
                </tfoot>

                <tbody>
                    {renderItems(fetch)}
                </tbody>
            </table>
        </section>
    )

}

export default DeleteUserPage