import { NavLink } from 'react-router-dom';

const Logo = ({ size = 'default' }) => {
	// Xác định kích thước dựa vào prop size
	const sizes = {
		small: { logo: 'w-8 h-8', text: 'text-lg' },
		default: { logo: 'w-10 h-10', text: 'text-xl' },
		large: { logo: 'w-12 h-12', text: 'text-2xl' },
	};

	const { logo: logoSize, text: textSize } = sizes[size] || sizes.default;

	return (
		<NavLink to="/" className="relative flex items-center group">
			<div className="flex items-center">
				{/* 3D Logo icon */}
				<div className={`relative ${logoSize} mr-3`}>
					{/* Shadow base */}
					<div className="absolute inset-0 rounded-full bg-blue-800 transform translate-y-[2px] blur-[2px]"></div>

					{/* Main circle */}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full shadow-lg"></div>

					{/* Highlight */}
					<div className="absolute inset-[3%] top-[3%] left-[3%] right-[40%] bottom-[40%] bg-blue-400/30 rounded-full blur-[1px]"></div>

					{/* Inner circle */}
					<div className="absolute inset-[15%] bg-white rounded-full shadow-inner"></div>

					{/* Sport icon with 3D effect */}
					<div className="absolute inset-[25%] bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-inner">
						{/* Sport icon */}
						<div className="relative w-[60%] h-[60%]">
							{/* Icon shadow */}
							<div className="absolute inset-0 w-full h-full flex items-center justify-center transform translate-y-[1px]">
								<svg
									className="w-full h-full text-blue-900/50"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M12 2V22"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
									<path
										d="M19.5 5.5L4.5 18.5"
										stroke="currentColor"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>

							{/* Icon main */}
							<svg
								className="absolute inset-0 w-full h-full text-white"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M12 2V22"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M19.5 5.5L4.5 18.5"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Brand name with 3D effect */}
				<div className="flex flex-col">
					<div
						className={`font-bold ${textSize} text-blue-800 transform group-hover:translate-y-[-1px] transition-transform duration-200`}
					>
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
							Sportiverse
						</span>
					</div>

					{/* Text shadow for 3D effect */}
					<div
						className={`absolute font-bold ${textSize} text-blue-900/10 transform translate-y-[1px] blur-[0.5px] select-none pointer-events-none`}
					>
						Sportiverse
					</div>
				</div>
			</div>
		</NavLink>
	);
};

export default Logo;
