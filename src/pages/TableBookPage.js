import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { useRef, useState, useEffect, useCallback } from 'react';

const BOOKS_URL = '/api/1.0.0/library/books';

// function getBooks() {
//     return fetch('https://localhost:7060/api/1.0.0/library/books',
//         {
//             method: "GET",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//             },
//         })
//         .then((response) => response.json())
//         .then((responseData) => {
//             console.log(responseData);
//             return responseData;
//         })
//         .catch(error => console.warn(error));
// }

const TableBookPage = () => {
    const navigate = useNavigate();

    const [fetch, setFetch] = useState(null)
    // const [posts, setPosts] = useState([]);

    // const getBooks = () => {
    //     return fetch('https://tai-api.azurewebsites.net/api/1.0.0/api/1.0.0/library/books')
    //         .then(response => response.json())
    //         .then(json => {
    //             return json.id;
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    // const getBooks = () => {
    //     axios.get('/api/1.0.0/api/1.0.0/library/books')
    //     .then(response => {
    //         console.log(response)
    //         this.setState({posts: response.data})
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // }



    // getBooks().then(response => console.log(response));

    // useEffect(() => {
    //     axios
    //         .get('/api/1.0.0/api/1.0.0/library/books', {
    //             headers: { 'Content-Type': 'application/json' },
    //             withCredentials: true
    //         })
    //         .then((response) => {
    //             setPosts(response.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);


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

    const renderItems = (arr) => {
        if (arr) {
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
        <section style={{ minWidth: 'calc(100vw - 75px)', height: 'calc(100vh - 75px)', overflow: 'hidden' }}>
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
                        <td colSpan="5">
                            <button onClick={() => { navigate('/addbook') }}>Add</button>
                            <button onClick={() => { navigate('/deletebook') }}>Delete</button>
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

export default TableBookPage