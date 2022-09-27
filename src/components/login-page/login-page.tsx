import React, { useState, ChangeEvent, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { Navigate } from 'react-router-dom';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { AuthContext } from '../../providers/auth';

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, setUser } = useContext(AuthContext);

    const setEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const setPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                if (user && setUser) {
                    setUser(user);
                }

                // ...
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user && setUser) {
                    setUser(user);
                }

                // ...
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loginWithEmailAndPassword = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user && setUser) {
                    setUser(user);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            {user && <Navigate to="/" replace={true} />}
            <Card>
                <CardContent sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                    <TextField
                        id="filled-basic"
                        value={email}
                        onChange={setEmailValue}
                        fullWidth
                        label="Email"
                        variant="filled"
                    />
                    <TextField
                        id="filled-basic"
                        label="Password"
                        value={password}
                        fullWidth
                        type="password"
                        onChange={setPasswordValue}
                        variant="filled"
                    />
                </CardContent>
                <CardActions>
                    <Button color="secondary" variant="text" onClick={signUp}>
                        Signup
                    </Button>
                    <Button variant="text" onClick={loginWithEmailAndPassword}>
                        Login
                    </Button>
                    <Button variant="text" onClick={signInWithGoogle}>
                        Login with Google
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};
