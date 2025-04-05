import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import loginImage from '../assets/login-image.jpg';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { setToken, setUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
			});
			const data = await response.json();
			console.log('dataCC', data);
			if (response.ok) {
				setToken(data.token); // Lưu token vào AuthContext
				localStorage.setItem('token', data.token); // Lưu token vào localStorage
				setUser(data.user);
				console.log('user', data.user);
				navigate('/');
			} else {
				alert(data.message);
			}
		} catch (error) {
			console.error('Error logging in:', error);
			alert('Đã có lỗi xảy ra, vui lòng thử lại!');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
				{/* Bên trái: Hình ảnh */}
				<div className="hidden md:block w-1/2">
					<img
						src={loginImage}
						alt="Login Background"
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Bên phải: Form đăng nhập */}
				<div className="w-full md:w-1/2 p-8">
					<h2 className="text-2xl font-bold mb-4">
						Đăng nhập tài khoản
					</h2>

					{/* Form đăng nhập */}
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-gray-700 font-semibold mb-2">
								Nhập địa chỉ Email
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Email"
								className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700 font-semibold mb-2">
								Mật khẩu
							</label>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Mật khẩu"
								className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							Đăng nhập
						</button>
					</form>

					{/* Đăng nhập bằng mạng xã hội */}
					<div className="mt-6">
						<p className="text-center text-gray-600 mb-4">
							Hoặc đăng nhập với
						</p>
						<div className="flex justify-center space-x-4">
							<button className="p-2 border rounded-full hover:bg-gray-100">
								<i className="fab fa-facebook-f text-blue-600 text-lg"></i>
							</button>
							<button className="p-2 border rounded-full hover:bg-gray-100">
								<i className="fab fa-apple text-gray-800 text-lg"></i>
							</button>
							<button className="p-2 border rounded-full hover:bg-gray-100">
								<i className="fab fa-google text-red-600 text-lg"></i>
							</button>
						</div>
					</div>

					{/* Thông tin bổ sung */}
					<div className="mt-6">
						<p className="text-center text-gray-600 font-semibold">
							Bạn chưa có tài khoản?{' '}
							<Link
								to="/register"
								className="text-blue-600 hover:underline"
							>
								Đăng ký
							</Link>
						</p>
						<p className="text-center text-gray-600 font-semibold mt-2">
							Liên hệ đội ngũ chăm sóc khách hàng
						</p>
						<p className="text-center text-gray-600 mt-2">
							Thứ 2 - Chủ nhật: 7h - 9h đến 22h; Chủ Nhật: 7h -
							10h đến 19h 18009044
						</p>
						<p className="text-center text-gray-600 mt-2">
							Đăng nhập để nhận những thông tin mới nhất từ
							Sportiverse
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
