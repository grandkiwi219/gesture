import { Link } from 'react-router';

export default function () {
    return (
        <>
            <nav id="menu">
                <Link to="/">Home</Link>
                <Link to="/settings">Settings</Link>
            </nav>
        </>
    );
}
