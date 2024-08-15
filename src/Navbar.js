import { useState, useEffect } from 'react';
import Clock from './Clock';

export default function Navbar({ appName }) {
    const today = new Date();

    function formatDate(date) {
        return new Intl.DateTimeFormat(
            'en-US',
            { weekday: 'long' }
        ).format(date);
    }

    function useTime() {
        const [time, setTime] = useState(() => new Date());
        useEffect(() => {
            const id = setInterval(() => {
                setTime(new Date());
            }, 1000);
            return () => clearInterval(id);
        }, []);
        return time;
    }

    const time = useTime();

    return (
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{appName}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Read Mode</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="./Books">Books List (Create/Update/Delete)</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <Clock color={'white'} time={time.toLocaleTimeString()} />
                        <span style={{ color: "white", fontWeight: "bold" }}>{formatDate(today)}</span>
                    </form>
                </div>
            </div>
        </nav>
    )
}