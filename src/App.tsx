import './App.css';
import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import Container from '@mui/material/Container';

function App() {
    return (
        <Container maxWidth="sm">
            <Header />
            <main>
                <Outlet />
            </main>
            <footer>&copy; 2022</footer>
        </Container>
    );
}

export default App;
