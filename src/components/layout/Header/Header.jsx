import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Logo from '../../common/Logo';
import SearchBar from '../../common/SearchBar';
import Navigation from './Navigation';
import UserDropdown from './UserDropdown';
import {
	FaShoppingCart,
	FaUser,
	FaUserPlus,
	FaHeart,
	FaSearch,
	FaQuestionCircle,
} from 'react-icons/fa';

const Header = ({ sports }) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const [showMobileSearch, setShowMobileSearch] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const [wishlistCount, setWishlistCount] = useState(0);
	const { user, token } = useAuth();
	const avatarRef = useRef(null);

	// Fetch cart count và wishlist count khi user đăng nhập
	useEffect(() => {
		if (token && user) {
			// Fetch cart count
			const fetchCartCount = async () => {
				try {
					const response = await fetch('/api/cart/count', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response.ok) {
						const data = await response.json();
						setCartCount(data.count);
					}
				} catch (error) {
					console.error('Error fetching cart count:', error);
				}
			};

			// Fetch wishlist count
			const fetchWishlistCount = async () => {
				try {
					const response = await fetch('/api/wishlist/count', {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response.ok) {
						const data = await response.json();
						setWishlistCount(data.count);
					}
				} catch (error) {
					console.error('Error fetching wishlist count:', error);
				}
			};

			fetchCartCount();
			fetchWishlistCount();
		} else {
			// Reset counts if user logs out
			setCartCount(0);
			setWishlistCount(0);
		}
	}, [token, user]);

	return (
		<header className="bg-white shadow-md w-full sticky top-0 z-50">
			{/* Phần trên: Logo, Search, Icons */}
			<div className="w-full max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
				{/* Logo */}
				<div className="flex-shrink-0">
					<Logo />
				</div>

				{/* Thanh tìm kiếm - Ẩn trên mobile */}
				<div className="flex-grow max-w-3xl mx-5 hidden md:block">
					<SearchBar />
				</div>

				{/* Icons bên phải */}
				<div className="flex items-center space-x-4">
					{/* Icon tìm kiếm trên mobile */}
					<button
						className="md:hidden text-gray-700 hover:text-blue-600 transition-colors duration-200"
						onClick={() => setShowMobileSearch(!showMobileSearch)}
					>
						<FaSearch className="text-xl" />
					</button>

					{/* Wishlist - Hiển thị cho tất cả người dùng */}
					<NavLink
						to={token ? '/wishlist' : '/login?redirect=wishlist'}
						className="hidden sm:flex items-center space-x-1.5 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
					>
						<div className="relative">
							<FaHeart className="text-xl group-hover:scale-110 transition-transform duration-200" />
							{token && wishlistCount > 0 && (
								<div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
									{wishlistCount > 99 ? '99+' : wishlistCount}
								</div>
							)}
						</div>
						<span className="hidden lg:inline font-medium">
							Yêu thích
						</span>
					</NavLink>

					{/* Giỏ hàng - Hiển thị cho tất cả người dùng */}
					<NavLink
						to={token ? '/cart' : '/login?redirect=cart'}
						className="flex items-center space-x-1.5 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
					>
						<div className="relative">
							<FaShoppingCart className="text-xl group-hover:scale-110 transition-transform duration-200" />
							{token && cartCount > 0 && (
								<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
									{cartCount > 99 ? '99+' : cartCount}
								</div>
							)}
						</div>
						<span className="hidden sm:inline font-medium">
							Giỏ hàng
						</span>
					</NavLink>

					{/* Trợ giúp */}
					<NavLink
						to="/help"
						className="hidden sm:flex items-center space-x-1.5 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
					>
						<FaQuestionCircle className="text-xl group-hover:scale-110 transition-transform duration-200" />
						<span className="hidden lg:inline font-medium">
							Trợ giúp
						</span>
					</NavLink>

					{token && user ? (
						<div className="relative flex items-center space-x-3">
							{/* Avatar người dùng */}
							<button
								ref={avatarRef}
								onClick={() => setShowDropdown(!showDropdown)}
								className="avatar-button flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
							>
								<div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-gray-200 hover:border-blue-400 transition-colors duration-200 shadow-sm">
									<img
										src={user.avatar}
										alt="User Avatar"
										className="w-full h-full object-cover"
									/>
								</div>
								<span className="hidden lg:inline font-medium">
									{user.name?.split(' ')[0]}
								</span>
							</button>

							{/* Dropdown menu */}
							<UserDropdown
								showDropdown={showDropdown}
								setShowDropdown={setShowDropdown}
							/>
						</div>
					) : (
						<div className="flex items-center space-x-3">
							<NavLink
								to="/login"
								className="flex items-center space-x-1.5 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-blue-50"
							>
								<FaUser className="text-lg" />
								<span className="font-medium">Đăng nhập</span>
							</NavLink>
							<NavLink
								to="/register"
								className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 rounded-md shadow-sm"
							>
								<FaUserPlus className="text-lg" />
								<span className="font-medium">Đăng ký</span>
							</NavLink>
						</div>
					)}
				</div>
			</div>

			{/* Thanh tìm kiếm mobile - Hiển thị khi click vào icon tìm kiếm */}
			{showMobileSearch && (
				<div className="w-full px-4 py-2 border-t border-gray-100 md:hidden">
					<SearchBar />
				</div>
			)}

			{/* Phần dưới: Menu điều hướng */}
			<div className="w-full border-t border-gray-100">
				<Navigation sports={sports} />
			</div>
		</header>
	);
};

export default Header;
