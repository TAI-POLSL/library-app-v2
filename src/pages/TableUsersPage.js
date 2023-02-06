import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

const USERS_URL = '/api/1.0.0/library/accounts';

const TableUsersPage = () => {
    const navigate = useNavigate();

    const [fetch, setFetch] = useState(null)

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

    const renderItems = (arr) => {
        if(arr)
        {
            return arr.map((item, i) => {
                return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.fullName}</td>
                </tr>
                );
            });
        }
    }

    return (
        <section style={{minWidth: 'calc(100vw - 75px)', height: 'calc(100vh - 75px)', overflow: 'hidden'}}>
            <h1>Users table</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Username</td>
                        <td>fullName</td>
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