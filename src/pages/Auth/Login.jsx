// src/pages/Auth/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/login-image.jpg';
import LoginForm from '../../components/auth/LoginForm';
import SocialLogin from '../../components/auth/SocialLogin';
import Logo from '../../components/common/Logo';
import { FaHome } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function Login() {
	const particlesInit = async (main) => {
		await loadFull(main);
	};
	return (
		<div className="min-h-screen relative overflow-hidden flex items-center justify-center">
			{/* Nền đẹp và phức tạp hơn */}
			<div className="fixed inset-0 z-0">
				{/* Nền gradient chính */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900"></div>

				{/* Pattern overlay */}
				<div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage:
							"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
						backgroundSize: '24px 24px',
					}}
				></div>

				{/* Animated blobs */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
					<div className="absolute top-[10%] left-[15%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-blob"></div>
					<div className="absolute top-[40%] right-[15%] w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 animate-blob animation-delay-2000"></div>
					<div className="absolute bottom-[10%] left-[35%] w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-25 animate-blob animation-delay-4000"></div>
				</div>

				{/* Light beams */}
				<div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-b from-blue-400/10 to-transparent transform -rotate-12 origin-top-left"></div>
				<div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-to-t from-purple-400/10 to-transparent transform rotate-12 origin-bottom-right"></div>

				{/* Floating particles */}
				<div className="absolute inset-0">
					<Particles
						id="tsparticles"
						init={particlesInit}
						options={{
							fullScreen: { enable: false },
							background: {
								color: {
									value: 'transparent',
								},
							},
							fpsLimit: 60,
							particles: {
								color: {
									value: '#ffffff',
								},
								links: {
									color: '#ffffff',
									distance: 150,
									enable: true,
									opacity: 0.2,
									width: 1,
								},
								collisions: {
									enable: true,
								},
								move: {
									direction: 'none',
									enable: true,
									outModes: {
										default: 'bounce',
									},
									random: false,
									speed: 0.5,
									straight: false,
								},
								number: {
									density: {
										enable: true,
										area: 800,
									},
									value: 50,
								},
								opacity: {
									value: 0.3,
								},
								shape: {
									type: 'circle',
								},
								size: {
									value: { min: 1, max: 3 },
								},
							},
							detectRetina: true,
						}}
						className="absolute inset-0"
					/>
				</div>
			</div>

			{/* Nút quay về trang chủ */}
			<div className="absolute top-4 left-4 z-20">
				<Link
					to="/"
					className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-md rounded-full shadow-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
					title="Quay về trang chủ"
				>
					<FaHome className="text-white text-lg" />
				</Link>
			</div>

			{/* Vùng chứa chính - Thêm backdrop blur */}
			<div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-6">
				{/* Khung chính - Thêm backdrop blur và border */}
				<div
					className="flex w-full bg-white/95 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20"
					style={{ maxHeight: '600px', height: '85vh' }}
				>
					{/* Bên trái: Hình ảnh với overlay - Chiều cao 100% */}
					<div className="hidden md:block w-5/12 relative">
						<img
							src={loginImage}
							alt="Login Background"
							className="w-full h-full object-cover"
						/>
						{/* Giảm độ đậm của overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-600/55 to-blue-900/40 flex flex-col justify-center px-8">
							{/* Hiệu ứng ánh sáng */}
							<div className="absolute inset-0 overflow-hidden">
								<div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
								<div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
							</div>

							<div className="relative mb-6">
								<svg
									width="50"
									height="50"
									viewBox="0 0 60 60"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="filter drop-shadow-lg"
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
							<h1 className="text-3xl font-bold mb-3 text-white drop-shadow-md">
								Chào mừng trở lại!
							</h1>
							<p className="text-base text-blue-100 mb-4 drop-shadow">
								Đăng nhập để khám phá thế giới thể thao chất
								lượng cao tại Sportiverse.
							</p>
							<div className="flex space-x-2">
								<div className="w-10 h-1 bg-blue-400 rounded-full shadow-lg"></div>
								<div className="w-3 h-1 bg-white/50 rounded-full"></div>
								<div className="w-3 h-1 bg-white/50 rounded-full"></div>
							</div>
						</div>
					</div>

					{/* Bên phải: Form đăng nhập - Có thể cuộn */}
					<div className="w-full md:w-7/12 flex flex-col bg-white">
						{/* Phần trên cố định */}
						<div className="p-6 md:p-8">
							<div className="flex justify-center md:justify-start mb-6">
								<Logo />
							</div>

							<h2 className="text-2xl font-bold text-gray-800 mb-1">
								Đăng nhập tài khoản
							</h2>
							<p className="text-gray-600 mb-6 text-sm">
								Nhập thông tin đăng nhập của bạn để tiếp tục
							</p>
						</div>

						{/* Phần có thể cuộn */}
						<div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 custom-scrollbar">
							{/* Form đăng nhập */}
							<LoginForm />

							{/* Đăng nhập bằng mạng xã hội */}
							<SocialLogin />

							{/* Thông tin bổ sung */}
							<div className="mt-6 text-center">
								<p className="text-gray-600 text-sm mb-1">
									Bạn chưa có tài khoản?{' '}
									<Link
										to="/register"
										className="text-blue-600 font-medium hover:underline"
									>
										Đăng ký ngay
									</Link>
								</p>
								<Link
									to="/forgot-password"
									className="text-xs text-blue-600 hover:underline"
								>
									Quên mật khẩu?
								</Link>
							</div>

							{/* Thông tin hỗ trợ - Thu gọn */}
							<div className="mt-6 pt-4 border-t border-gray-200">
								<p className="text-center text-xs text-gray-500">
									<span className="font-medium">
										Hỗ trợ khách hàng:
									</span>{' '}
									Thứ 2 - Chủ nhật: 7h - 22h | Hotline:{' '}
									<span className="font-medium">
										18009044
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer nhỏ */}
			<div className="absolute bottom-2 w-full text-center text-xs text-white/70 z-10">
				© 2025 Sportiverse. Tất cả các quyền được bảo lưu.
			</div>
		</div>
	);
}
