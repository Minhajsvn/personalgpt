// src/components/Register.js
import { useState } from 'react';
import axios from 'axios';

const Register = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(true);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', { username, password });
            setIsRegistering(false);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);
            onLogin(token);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </form>
    );
};

export default Register;
