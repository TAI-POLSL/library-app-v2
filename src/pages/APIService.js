export default class APIService {
    static GetBooks(id, body) {
        return fetch(`http://127.0.0.1:5000/update/${id}/`, { //cała ścieżka jest w pomiędzy tym znaczkiem pod tyldą na klawie, a nie zwykłym apostrofem
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static UpdateArticle(id, body) {
        return fetch(`http://127.0.0.1:5000/update/${id}/`, { //cała ścieżka jest w pomiędzy tym znaczkiem pod tyldą na klawie, a nie zwykłym apostrofem
            'method': 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static InsertArticle(body) {
        return fetch(`http://127.0.0.1:5000/add`, { //cała ścieżka jest w pomiędzy tym znaczkiem pod tyldą na klawie, a nie zwykłym apostrofem
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static DeleteArticle(id) {
        return fetch(`http://127.0.0.1:5000/delete/${id}/`, { //cała ścieżka jest w pomiędzy tym znaczkiem pod tyldą na klawie, a nie zwykłym apostrofem
            'method': 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}