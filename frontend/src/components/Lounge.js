import { Link } from "react-router-dom";

const Lounge = () => {
    
    return (
        <section>
            <p>Admins and Users are allowed.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Lounge