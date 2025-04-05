import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';

const UserDropdown = ({ showDropdown, setShowDropdown }) => {
	const dropdownRef = useRef(null);
	const { user, setToken } = useAuth();

	// Xử lý click ra ngoài để đóng dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				!event.target.closest('.avatar-button')
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setShowDropdown]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setToken(null); // Sử dụng setToken từ AuthContext
		setShowDropdown(false);
		// Không cần gọi setUser(null) vì useEffect trong AuthContext sẽ tự động cập nhật
	};

	return (
		<AnimatePresence>
			{showDropdown && (
				<motion.div
					ref={dropdownRef}
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.2 }}
					className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden"
				>
					{/* Phần header với thông tin người dùng */}
					<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
						<div className="flex items-center space-x-3">
							<img
								src={user?.avatar || 'default-avatar.png'}
								alt="User Avatar"
								className="w-12 h-12 rounded-full border-2 border-white shadow-md"
							/>
							<div className="overflow-hidden">
								<p className="font-semibold text-lg truncate">
									{user?.name}
								</p>
								<p className="text-sm text-blue-100 truncate">
									{user?.email}
								</p>
							</div>
						</div>
					</div>

					{/* Phần menu chính */}
					<div className="py-2">
						<NavLink
							to="/profile"
							className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
							onClick={() => setShowDropdown(false)}
						>
							<i className="fas fa-user-circle w-5 mr-3 text-gray-500"></i>
							<span>Thông tin cá nhân</span>
						</NavLink>

						<NavLink
							to="/orders"
							className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
							onClick={() => setShowDropdown(false)}
						>
							<i className="fas fa-shopping-bag w-5 mr-3 text-gray-500"></i>
							<span>Đơn hàng của tôi</span>
						</NavLink>

						<NavLink
							to="/wishlist"
							className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
							onClick={() => setShowDropdown(false)}
						>
							<i className="fas fa-heart w-5 mr-3 text-gray-500"></i>
							<span>Danh sách yêu thích</span>
						</NavLink>
					</div>

					{/* Phần footer với nút đăng xuất */}
					<div className="border-t border-gray-200 mt-2">
						<button
							onClick={handleLogout}
							className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
						>
							<i className="fas fa-sign-out-alt w-5 mr-3"></i>
							<span>Đăng xuất</span>
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default UserDropdown;
