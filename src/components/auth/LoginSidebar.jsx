// src/components/auth/LoginSidebar.jsx
import React from 'react';

const LoginSidebar = ({ image }) => {
	return (
		<div className="hidden md:block w-1/2 relative">
			<img
				src={image}
				alt="Login Background"
				className="w-full h-full object-cover"
			/>
			<div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-900/80 flex flex-col justify-center px-10 text-white">
				<div className="mb-8">
					<svg
						width="60"
						height="60"
						viewBox="0 0 60 60"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="30"
							cy="30"
							r="28"
							fill="white"
							fillOpacity="0.2"
							stroke="white"
							strokeWidth="4"
						/>
						<path
							d="M30 15C34.9782 15 39.7936 17.1071 43.3553 20.6569C46.9171 24.2066 49.0242 29.0218 49.0242 34C49.0242 38.9782 46.9171 43.7936 43.3553 47.3553C39.7936 50.9171 34.9782 53.0242 30 53.0242C25.0218 53.0242 20.2064 50.9171 16.6447 47.3553C13.0829 43.7936 10.9758 38.9782 10.9758 34C10.9758 29.0218 13.0829 24.2064 16.6447 20.6447C20.2064 17.0829 25.0218 14.9758 30 14.9758"
							stroke="white"
							strokeWidth="4"
							strokeLinecap="round"
						/>
					</svg>
				</div>
				<h1 className="text-4xl font-bold mb-4">Chào mừng trở lại!</h1>
				<p className="text-lg text-blue-100 mb-6">
					Đăng nhập để khám phá thế giới thể thao chất lượng cao tại
					Sportiverse.
				</p>
				<div className="flex space-x-2">
					<div className="w-12 h-1 bg-blue-400 rounded-full"></div>
					<div className="w-3 h-1 bg-white/50 rounded-full"></div>
					<div className="w-3 h-1 bg-white/50 rounded-full"></div>
				</div>
			</div>
		</div>
	);
};

export default LoginSidebar;
