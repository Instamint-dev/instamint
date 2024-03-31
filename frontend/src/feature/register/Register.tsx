import React, { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from './service/RegisterService.ts'; // Import de la fonction registerUser depuis votre fichier api.js


const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
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
            await registerUser(formData); // Utilisation de la fonction registerUser pour effectuer l'inscription
            setSuccess('Inscription réussie. Vous pouvez maintenant vous connecter.');
            // console.log(formData);

        } catch (err:any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* ...champs du formulaire (username, email, password)... */}
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Nom d'utilisateur" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" />
                <button type="submit">S'inscrire</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegisterPage;
