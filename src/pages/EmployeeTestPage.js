import { Link } from 'react-router-dom';

const EmployeeTestPage = () => {
    return (
        <section>
            <Link to="/">EmployeeTestPage - back to home</Link>
            <p>
                <span className="line">
                    <Link to="/rentbooks">Rented books page</Link>
                </span>
            </p>
        </section>
    )
}

export default EmployeeTestPage