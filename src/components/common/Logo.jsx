import { NavLink } from 'react-router-dom';

const Logo = () => {
	const SportiverseLogo = () => (
		<div className="flex items-center">
			<div className="relative w-10 h-10 mr-2">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full"></div>
				<div className="absolute inset-1 bg-white rounded-full"></div>
				<div className="absolute inset-2 bg-gradient-to-r from-blue-700 to-blue-500 rounded-full flex items-center justify-center">
					<div className="w-4 h-4 bg-white transform rotate-45"></div>
				</div>
			</div>
			<div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
				Sportiverse
			</div>
		</div>
	);

	return (
		<NavLink
			to="/"
			className="relative flex items-center space-x-2 text-blue-600 hover:text-blue-800"
		>
			<SportiverseLogo />
		</NavLink>
	);
};

export default Logo;
