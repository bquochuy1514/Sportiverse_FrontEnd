import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Logo from './Logo';
import SearchBar from '../../common/SearchBar';
import Navigation from './Navigation';
import UserDropdown from './UserDropdown';

const Header = ({ sports }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const { user, token } = useAuth(); // Sử dụng token để kiểm tra đã đăng nhập chưa
	const avatarRef = useRef(null);

	return (
		<header className="bg-white shadow-md">
			{/* Phần trên: Logo, Search, Icons */}
			<div className="container mx-auto px-4 py-2 flex items-center justify-between">
				{/* Logo */}
				<Logo />

				{/* Thanh tìm kiếm */}
				<SearchBar />

				{/* Icons bên phải */}
				<div className="flex items-center space-x-4">
					{token && user ? ( // Kiểm tra cả token và user
						<div className="relative flex items-center space-x-4">
							<NavLink
								to="/cart"
								className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
							>
								<i className="fas fa-shopping-cart"></i>
								<span>Giỏ hàng</span>
							</NavLink>

							{/* Avatar người dùng */}
							<button
								ref={avatarRef}
								onClick={() => setShowDropdown(!showDropdown)}
								className="avatar-button flex items-center space-x-1 text-gray-800 hover:text-blue-600"
							>
								<img
									src={user.avatar}
									alt="User Avatar"
									className="w-10 h-10 border-gray-300 border-2 rounded-full"
								/>
							</button>

							{/* Dropdown menu */}
							<UserDropdown
								showDropdown={showDropdown}
								setShowDropdown={setShowDropdown}
							/>
						</div>
					) : (
						<>
							<NavLink
								to="/login"
								className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
							>
								<i className="fas fa-user"></i>
								<span>Đăng nhập</span>
							</NavLink>
							<NavLink
								to="/register"
								className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
							>
								<i className="fas fa-user-plus"></i>
								<span>Đăng ký</span>
							</NavLink>
						</>
					)}
				</div>
			</div>

			{/* Phần dưới: Menu điều hướng */}
			<Navigation sports={sports} />
		</header>
	);
};

export default Header;
