import { useState, useEffect, useRef } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { fetchSports, fetchCategories } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import sportBannerImage from '../assets/banner-sport.jpg'; // Đường dẫn đến hình ảnh

export default function Layout() {
	const [sports, setSports] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [activeSport, setActiveSport] = useState(null); // Theo dõi môn thể thao đang được click
	const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
	const { user, setUser } = useAuth();

	// Ref để tham chiếu đến dropdown và avatar
	const dropdownRef = useRef(null);
	const avatarRef = useRef(null);
	const sportDropdownRef = useRef(null); // Ref cho dropdown của danh mục

	// Lấy danh sách môn thể thao từ API
	useEffect(() => {
		const getSports = async () => {
			try {
				const data = await fetchSports();
				setSports(data);
			} catch (error) {
				console.error('Error fetching sports:', error);
			}
		};
		getSports();
		console.log('user', user);
	}, []);

	// Xử lý click ra ngoài để đóng dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target) &&
				avatarRef.current &&
				!avatarRef.current.contains(event.target)
			) {
				setShowDropdown(false);
			}
			if (
				sportDropdownRef.current &&
				!sportDropdownRef.current.contains(event.target) &&
				!event.target.closest('.sport-item') // Không đóng nếu click vào chính sport-item
			) {
				setActiveSport(null);
				setCategories([]);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Xử lý click để hiển thị danh mục
	const handleToggleCategories = async (sportId, e) => {
		e.stopPropagation(); // Ngăn sự kiện lan tỏa

		if (activeSport === sportId) {
			// Nếu đã mở, đóng dropdown
			setActiveSport(null);
			setCategories([]);
		} else {
			// Nếu chưa mở, lấy danh mục và mở dropdown
			setActiveSport(sportId);
			try {
				const data = await fetchCategories(sportId);
				setCategories(data);
			} catch (error) {
				console.error('Error fetching categories:', error);
				setCategories([]);
			}
		}
	};

	// Xử lý tìm kiếm (placeholder)
	const handleSearch = (e) => {
		e.preventDefault();
		console.log('Tìm kiếm:', searchQuery);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		setUser(null);
		alert('Đăng xuất thành công!');
	};

	// Hàm để gán icon dựa trên tên môn thể thao
	const getSportIcon = (sportName) => {
		switch (sportName.toLowerCase()) {
			case 'bóng đá':
				return 'fas fa-futbol';
			case 'bóng rổ':
				return 'fas fa-basketball-ball';
			case 'cầu lông':
				return 'fas fa-shuttlecock';
			case 'bơi lội':
				return 'fas fa-swimmer';
			case 'chạy bộ':
				return 'fas fa-running';
			case 'đạp xe':
				return 'fas fa-bicycle';
			case 'tennis':
				return 'fas fa-tennis-ball';
			default:
				return 'fas fa-dumbbell';
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			{/* Header */}
			<header className="bg-white shadow-md">
				{/* Phần trên: Logo, Search, Icons */}
				<div className="container mx-auto px-4 py-2 flex items-center justify-between">
					{/* Logo với icon thể thao */}
					<NavLink
						to="/"
						className="relative flex items-center space-x-2 text-blue-600 hover:text-blue-800"
					>
						<i className="fa-solid fa-futbol text-2xl -mr-1"></i>
						<span className="text-2xl font-bold">Sportiverse</span>
					</NavLink>

					{/* Thanh tìm kiếm */}
					<form onSubmit={handleSearch} className="flex-grow mx-8">
						<div className="relative">
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Tìm kiếm sản phẩm, môn thể thao"
								className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
						</div>
					</form>

					{/* Icons bên phải */}
					<div className="flex items-center space-x-4">
						{user ? (
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
									onClick={() =>
										setShowDropdown(!showDropdown)
									}
									className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
								>
									<img
										src={
											user.avatar || 'default-avatar.png'
										}
										alt="User Avatar"
										className="w-10 h-10 border-gray-300 border-2 rounded-full"
									/>
								</button>

								{/* Dropdown menu */}
								{showDropdown && (
									<div
										ref={dropdownRef}
										className="absolute right-0 mt-40 w-48 bg-white rounded-md shadow-lg z-10"
									>
										<NavLink
											to="/profile"
											className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
											onClick={() =>
												setShowDropdown(false)
											}
										>
											Thông tin cá nhân
										</NavLink>
										<NavLink
											to="/orders"
											className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
											onClick={() =>
												setShowDropdown(false)
											}
										>
											Đơn hàng
										</NavLink>
										<button
											onClick={() => {
												handleLogout();
												setShowDropdown(false);
											}}
											className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
										>
											Đăng xuất
										</button>
									</div>
								)}
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

				{/* Phần dưới: Menu điều hướng (chỉ các môn thể thao) */}
				<nav className="bg-gray-100 py-2">
					<div className="container mx-auto px-4 relative">
						<ul className="flex space-x-6">
							{sports.map((sport) => (
								<li key={sport.id} className="relative">
									<div className="flex items-center">
										<span
											onClick={(e) =>
												handleToggleCategories(
													sport.id,
													e
												)
											}
											className={`sport-item flex items-center cursor-pointer ${
												activeSport === sport.id
													? 'text-blue-600 font-semibold'
													: 'text-gray-800 hover:text-blue-600'
											}`}
										>
											<i
												className={`${getSportIcon(
													sport.name
												)} mr-2`}
											></i>
											<span>{sport.name}</span>
											<i
												className={`fas fa-chevron-down ml-2 transform transition-transform duration-200 ${
													activeSport === sport.id
														? 'rotate-180'
														: ''
												}`}
											></i>
										</span>
									</div>
								</li>
							))}
							<li>
								<NavLink
									to="/products/sale"
									className={({ isActive }) =>
										isActive
											? 'text-red-600 font-semibold'
											: 'text-red-600 hover:text-red-700'
									}
								>
									HOT SALE
								</NavLink>
							</li>
						</ul>

						{/* Dropdown danh mục cố định toàn chiều rộng */}
						{activeSport && categories.length > 0 && (
							<div
								ref={sportDropdownRef}
								className="absolute left-0 right-0 top-full mt-4 bg-white rounded-md shadow-lg z-10 flex max-h-100 overflow-y-auto"
							>
								{/* Danh sách danh mục bên trái */}
								<div className="w-1/4 border-r py-4 overflow-y-auto">
									<div className="flex items-center justify-between px-4 mb-2">
										<h3 className="text-lg font-bold">
											{
												sports.find(
													(s) => s.id === activeSport
												)?.name
											}
										</h3>
										<NavLink
											to={`/products?sport_id=${activeSport}`}
											className="text-blue-600 hover:underline text-sm"
										>
											Xem tất cả
										</NavLink>
									</div>
									<ul className="space-y-2">
										{categories.map((category, index) => (
											<li
												key={category.id}
												className={`${
													index !==
													categories.length - 1
														? 'border-b border-gray-200'
														: ''
												} py-1`}
											>
												<NavLink
													to={`/products?category_id=${category.id}`}
													className="block px-4 pt-1 text-gray-800 hover:text-blue-600"
												>
													{category.name}
												</NavLink>
											</li>
										))}
									</ul>
								</div>

								{/* Khu vực bên phải (ảnh cố định chiều ngang) */}
								<div className="w-3/4 p-4">
									<div className="w-full h-full">
										<img
											src={sportBannerImage}
											alt="Sport Image"
											className="w-full h-full object-cover rounded-md"
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				</nav>
			</header>

			{/* Main content */}
			<main className="flex-grow container mx-auto px-4 py-4">
				<Outlet />
			</main>

			{/* Footer (đơn giản) */}
			<footer className="bg-gray-800 text-white p-4">
				<div className="container mx-auto text-center">
					<p>© 2025 Sportiverse. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
}
