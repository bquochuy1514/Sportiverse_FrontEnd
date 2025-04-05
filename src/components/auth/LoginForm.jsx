// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsArrowRight } from 'react-icons/bs';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { setToken, setUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
					remember_me: rememberMe,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				setToken(data.token);
				localStorage.setItem('token', data.token);

				// Lưu thông tin remember_me
				localStorage.setItem(
					'remember_me',
					data.remember_me ? 'true' : 'false'
				);

				setUser(data.user);
				navigate('/');
			} else {
				alert(data.message || 'Đăng nhập thất bại');
			}
		} catch (error) {
			console.error('Error logging in:', error);
			alert('Đã có lỗi xảy ra, vui lòng thử lại!');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<div>
				<label className="block text-gray-700 font-medium mb-2">
					Địa chỉ Email
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<HiMail className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="name@example.com"
						className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
			</div>

			<div>
				<label className="block text-gray-700 font-medium mb-2">
					Mật khẩu
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<RiLockPasswordLine className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
						className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<input
						id="remember-me"
						name="remember-me"
						type="checkbox"
						checked={rememberMe}
						onChange={(e) => setRememberMe(e.target.checked)}
						className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
					/>
					<label
						htmlFor="remember-me"
						className="ml-2 block text-sm text-gray-700"
					>
						Ghi nhớ đăng nhập
					</label>
				</div>
			</div>

			<button
				type="submit"
				disabled={isLoading}
				className="w-full flex items-center justify-center py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
				{isLoading ? (
					<svg
						className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				) : (
					<>
						Đăng nhập
						<BsArrowRight className="ml-2" />
					</>
				)}
			</button>
		</form>
	);
};

export default LoginForm;
