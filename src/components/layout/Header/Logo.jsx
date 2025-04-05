import { NavLink } from 'react-router-dom';

const Logo = () => {
	return (
		<NavLink
			to="/"
			className="relative flex items-center space-x-2 text-blue-600 hover:text-blue-800"
		>
			<i className="fa-solid fa-futbol text-2xl -mr-1"></i>
			<span className="text-2xl font-bold">Sportiverse</span>
		</NavLink>
	);
};

export default Logo;
