import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

const BOOKS_URL = '/api/1.0.0/library/rentals';

const RentBookPage = () => {
    const navigate = useNavigate();

    const [fetch, setFetch] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                BOOKS_URL,
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

    function parseDate(date) {
        return new Date(date).toISOString().replace('-', '/').split('T')[0].replace('-', '/');
    }

    const renderItems = (arr) => {
        if (arr) {
            return arr.map((item, i) => {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.user.id}</td>
                        <td>{item.user.username}</td>
                        <td>{item.user.firstName}</td>
                        <td>{item.user.lastName}</td>
                        <td>{item.author}</td>
                        <td>{item.title}</td>
                        <td>{parseDate(item.startDate)}</td>
                        <td>{parseDate(item.endDate)}</td>
                    </tr>
                );
            });
        }
    }

    return (
        <section style={{ minWidth: 'calc(100vw - 75px)', height: 'calc(100vh - 75px)', overflow: 'hidden' }}>
            <h1>Books table</h1>
            <br />
            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>User Id</td>
                        <td>Username</td>
                        <td>User first name</td>
                        <td>User last name</td>
                        <td>Author</td>
                        <td>Title</td>
                        <td>Start date</td>
                        <td>End date</td>
                    </tr>
                </thead>

                <tfoot>
                    <tr>
                        <td colSpan="5">
                            {/* <button onClick={() => { navigate('/addbook') }}>Add</button>
                            <button onClick={() => { navigate('/deletebook') }}>Delete</button> */}
                            {/* <button onClick={() => getBooks()}>Check working request</button> */}
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

export default RentBookPage