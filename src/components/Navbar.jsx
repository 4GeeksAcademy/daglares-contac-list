import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate ("/");
		window.location.reload();
	};

	return (
		<nav className="navbar navbar-light">
			<div className="container">
				<Link to="/" onClick={handleGoHome}>
					<span className="navbar-brand mb-0 mx-2 h1">
					<i className="fa-solid fa-book fa-lg mx-2"></i>	Agenda
					</span>
				</Link>
				<div className="ml-auto">
					<Link to="/form">
						<button className="btn btn-success">Add new contact</button>
					</Link>
				</div>
			</div>

		</nav>
	);
};