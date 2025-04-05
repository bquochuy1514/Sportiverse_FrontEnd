// src/components/auth/SocialLogin.jsx
import React from 'react';
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';

const SocialLogin = () => {
	return (
		<div className="mt-8">
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300"></div>
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="px-4 bg-white text-gray-500">
						Hoặc đăng nhập với
					</span>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-3 gap-3">
				<button className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
					<FaFacebookF className="text-blue-600" />
				</button>
				<button className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
					<FaApple className="text-gray-800" />
				</button>
				<button className="flex justify-center items-center py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
					<FaGoogle className="text-red-600" />
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;
