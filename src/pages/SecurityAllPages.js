import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

const SECURITY_SESSION_URL = '/api/1.0.0/library/logs/security';

const SecurityAllPages = () => {
    const navigate = useNavigate();

    const [fetch, setFetch] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                SECURITY_SESSION_URL,
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
                    <td>{item.logTime}</td>
                    <td>{item.ip}</td>
                    <td>{item.securityOperation}</td>
                    <td>{item.description}</td>
                    <td>{item.userId}</td>
                    <td>{item.username}</td>
                    <td>{item.operatorUserUsername}</td>
                    <td>{item.operatorUserRole}</td>
                </tr>
                );
            });
        }
    }

    return (
        <section style={{minWidth: 'calc(100vw - 75px)', height: 'calc(100vh - 75px)', overflow: 'hidden'}}>
            <h1>All security auditss</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Log time</td>
                        <td>IP</td>
                        <td>Operation</td>
                        <td>Descripton</td>
                        <td>Target user id</td>
                        <td>Target username</td>
                        <td>Trigger (Operator) username</td>
                        <td>Trigger (Operator) user role</td>
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

export default SecurityAllPages