import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

const USERS_URL = '/api/1.0.0/library/accounts';
const USERS_REMOVE_URL = '/api/1.0.0/library/account';

const TableUsersPage = () => {
    const navigate = useNavigate();
    const errRef = useRef();

    const [fetch, setFetch] = useState(null)
    const [errMsg, setErrMsg] = useState('');
    const [msg, setMsg] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                USERS_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setFetch(response?.data)
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const removeUser = async (e, id) => {
        e.preventDefault();

        try {
            const response = await axios.delete(
                `${USERS_REMOVE_URL}/${id}/close`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setMsg(`User account closed`);
            fetchData();
        } catch (err) {
            setMsg('');
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg(err.response.data);
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const renderItems = (arr) => {
        if(arr)
        {
            return arr.map((item, i) => {
                return (
                <tr key={item.id} onClick={(e) => removeUser(e, item.id)}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.fullName}</td>
                    <td>{item.isEnabled.toString()}</td>
                </tr>
                );
            });
        }
    }

    return (
        <section style={{minWidth: 'calc(100vw - 75px)', height: 'calc(100vh - 75px)', overflow: 'hidden'}}>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p ref={errRef} className={msg ? "msg" : "offscreen"} aria-live="assertive">{msg}</p>
            <h1>Users table</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Username</td>
                        <td>fullName</td>
                        <td>Active</td>
                    </tr>
                </thead>

                {/* <tfoot>
                    <tr>
                        <td colspan="4">
                            <button onClick={() => { navigate('/'); }}>Add</button>
                        </td>
                    </tr>
                </tfoot> */}

                <tbody>
                    {renderItems(fetch)}
                </tbody>
            </table>
        </section>
    )
}

export default TableUsersPage