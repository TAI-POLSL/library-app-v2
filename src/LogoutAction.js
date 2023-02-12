import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import axios from './api/axios';

const LOGOUT_URL = '/api/1.0.0/library/auth/logout';

const LogoutAction = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState(true);

    useEffect(()  => {
        async function action() {
            if(loading) {
                try {
                   await axios.delete(
                        LOGOUT_URL,
                        {
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true
                        }
                    );
            
                    const cookies = new Cookies();
                    cookies.remove('STORAGE', { path: '/' });
                } catch (err) {
                    console.log(err)
                } finally {
                    setTimeout(() => {setLoading(false);}, 500)
                }
            }
          }
          action();
    }, [loading])
    
    if(loading) {
        return (
            <section>Trwa wylogowanie z serwisu proszę czekać...</section>
        );
    } else {
        return (<Navigate to="/" replace />);
    }
}

export default LogoutAction