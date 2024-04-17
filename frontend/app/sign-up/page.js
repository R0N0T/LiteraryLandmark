'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import styles from './SignUp.module.css'; 

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent page refresh

        try {
            console.log(email, password);
            const res = await createUserWithEmailAndPassword(email, password);
            console.log(res);
            setEmail('');
            setPassword('');
        } catch (err) {
            console.error("error");
        }
        console.log('Signing up with:', { email, password });
    };

    return (
        <div className={styles.container}>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp} className={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
        </div>
    );
}
