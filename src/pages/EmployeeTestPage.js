import { Link } from 'react-router-dom';

const EmployeeTestPage = () => {
    return (
        <section>
            <Link to="/">EmployeeTestPage - back to home</Link>
            <p>
                <span className="line">
                    <Link to="/create/account">Create employee account</Link>
                </span>
                <span className="line">
                    <Link to="/create/account">Create client account</Link>
                </span>
            </p>
        </section>
    )
}

export default EmployeeTestPage