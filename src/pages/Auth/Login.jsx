// src/pages/Auth/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/login-image.jpg';
import LoginForm from '../../components/auth/LoginForm';
import SocialLogin from '../../components/auth/SocialLogin';
import LoginSidebar from '../../components/auth/LoginSidebar';
import Logo from '../../components/common/Logo';

export default function Login() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
			<div className="flex w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
				{/* Bên trái: Hình ảnh với overlay */}
				<LoginSidebar image={loginImage} />

				{/* Bên phải: Form đăng nhập */}
				<div className="w-full md:w-1/2 p-8 md:p-12">
					<div className="flex justify-center md:justify-start mb-8">
						<Logo />
					</div>

					<h2 className="text-3xl font-bold text-gray-800 mb-2">
						Đăng nhập tài khoản
					</h2>
					<p className="text-gray-600 mb-8">
						Nhập thông tin đăng nhập của bạn để tiếp tục
					</p>

					{/* Form đăng nhập */}
					<LoginForm />

					{/* Đăng nhập bằng mạng xã hội */}
					<SocialLogin />

					{/* Thông tin bổ sung */}
					<div className="mt-8 text-center">
						<p className="text-gray-600 mb-2">
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
							className="text-sm text-blue-600 hover:underline"
						>
							Quên mật khẩu?
						</Link>
					</div>

					{/* Thông tin hỗ trợ */}
					<div className="mt-10 pt-6 border-t border-gray-200">
						<p className="text-center text-sm text-gray-500">
							<span className="font-medium">
								Hỗ trợ khách hàng:
							</span>{' '}
							Thứ 2 - Chủ nhật: 7h - 22h
						</p>
						<p className="text-center text-sm text-gray-500 mt-1">
							Hotline:{' '}
							<span className="font-medium">18009044</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
