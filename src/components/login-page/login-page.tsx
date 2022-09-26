import React, { useState, ChangeEvent, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    User,
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
    const navigate = useNavigate();

    const setEmailValue = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const setPasswordValue = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                if (user && setUser) {
                    setUser(user);
                    navigate('/');
                }

                // ...
            })
            .catch((error) => {
                console.log(error);
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user && setUser) {
                    setUser(user);
                    navigate('/');
                }

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    const loginWithEmailAndPassword = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user && setUser) {
                    setUser(user);
                    navigate('/');
                }

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    return (
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
    );
};
