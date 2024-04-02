import React, { useState, ChangeEvent, FormEvent } from 'react'
import { loginUser } from './service/LoginService'
import user_login from "../../type/user_login.ts"

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<user_login>({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await loginUser(formData);
            setSuccess('Connexion réussie. Vous êtes maintenant connecté')

        } catch (err:any) {
            setError(err?.response?.data?.message || 'Erreur lors de l’inscription');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData?.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
                <input type="password" name="password" value={formData?.password} onChange={handleChange} placeholder="Mot de passe" />
                <button type="submit">Connexion </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default LoginPage;
