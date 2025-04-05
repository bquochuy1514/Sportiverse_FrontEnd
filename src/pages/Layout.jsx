import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { fetchSports } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
	const [sports, setSports] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const { user } = useAuth();
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
	}, []);

	// Xử lý tìm kiếm (placeholder)
	const handleSearch = (e) => {
		e.preventDefault();
		console.log('Tìm kiếm:', searchQuery);
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			{/* Header */}
			<header className="bg-white shadow-md">
				{/* Phần trên: Logo, Search, Icons */}
				<div className="container mx-auto px-4 py-2 flex items-center justify-between">
					{/* Logo với icon thể thao */}
					<NavLink to="/" className="flex items-center space-x-2">
						<i className="fas fa-futbol text-blue-600 text-2xl hover:text-blue-800"></i>
						<span className="text-2xl font-bold text-blue-600 hover:text-blue-800">
							Sportiverse
						</span>
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
							<div className="relative">
								{/* Avatar người dùng */}
								<button
									onClick={() =>
										setShowDropdown(!showDropdown)
									}
									className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
								>
									<img
										src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/480109065_1167600491426612_4235336121768318628_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHxJjJsO7GzpVY-3Hk_1wkuMLXnYitY1q0wtediK1jWrQVKlKUY8VuUgMovLcCL454XkVOwDoUBaX0vnxzGpFS-&_nc_ohc=aKkqZjcS7FMQ7kNvwFRDXvS&_nc_oc=AdnzxluSJwctqkmCjnaFRD12lWaF2h6YDtfEwCJD_FkRvooLgXY4ZqgA5IRrgNqb54E&_nc_zt=23&_nc_ht=scontent.fsgn5-5.fna&_nc_gid=wCtNckCyyJkf6ll98WwGzA&oh=00_AYHNrTS5nqo89cIBWgLxXMiVmF0_aSoIIY2LEQgZBptLDw&oe=67F60021"
										alt="User Avatar"
										className="w-10 h-10 rounded-full mr-4"
									/>
									<NavLink
										to="/cart"
										className="flex items-center space-x-1 text-gray-800 hover:text-blue-600"
									>
										<i className="fas fa-shopping-cart"></i>
										<span>Giỏ hàng</span>
									</NavLink>
								</button>

								{/* Dropdown menu */}
								{showDropdown && (
									<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
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
					<div className="container mx-auto px-4">
						<ul className="flex space-x-6">
							{sports.map((sport) => (
								<li key={sport.id}>
									<NavLink
										to={`/products?sport=${sport.id}`}
										className={({ isActive }) =>
											isActive
												? 'text-blue-600 font-semibold'
												: 'text-gray-800 hover:text-blue-600'
										}
									>
										{sport.name}
									</NavLink>
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
					</div>
				</nav>
			</header>

			{/* Main content */}
			<main className="flex-grow container mx-auto px-4 py-6">
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
