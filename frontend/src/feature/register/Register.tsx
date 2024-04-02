import React, { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from './service/RegisterService';
import user_register from "../../type/user_register.ts";


const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<user_register>({
        username: '',
        email: '',
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
            await registerUser(formData);
            setSuccess('Inscription réussie. Vous pouvez maintenant vous connecter.');

        } catch (err:any) {
            setError(err?.response?.data?.message || 'Erreur lors de l’inscription');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData?.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
                <input type="email" name="email" value={formData?.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData?.password} onChange={handleChange} placeholder="Mot de passe" />
                <button type="submit">S'inscrire</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;
