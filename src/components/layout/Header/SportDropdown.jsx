import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import sportBannerImage from '../../../assets/banner-sport.jpg';

const SportDropdown = ({ activeSport, setActiveSport, categories, sports }) => {
	const sportDropdownRef = useRef(null);

	// Xử lý click ra ngoài để đóng dropdown
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				sportDropdownRef.current &&
				!sportDropdownRef.current.contains(event.target) &&
				!event.target.closest('.sport-item')
			) {
				setActiveSport(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setActiveSport]);

	if (!activeSport || categories.length === 0) return null;

	const activeSportName =
		sports.find((s) => s.id === activeSport)?.name || '';
	const activeSportIcon = getSportIcon(activeSportName);

	// Hàm để gán icon dựa trên tên môn thể thao
	function getSportIcon(sportName) {
		switch (sportName.toLowerCase()) {
			case 'bóng đá':
				return 'fas fa-futbol';
			case 'bóng rổ':
				return 'fas fa-basketball-ball';
			case 'cầu lông':
				return 'fas fa-table-tennis';
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
	}

	// Phân nhóm danh mục
	const categoryGroups = {};

	// Phân nhóm theo phổ biến, dụng cụ, quần áo (đây là ví dụ, bạn cần điều chỉnh theo dữ liệu thực tế)
	categories.forEach((category) => {
		if (
			category.name.includes('Đồ') ||
			category.name.includes('Tất') ||
			category.name.includes('Áo')
		) {
			categoryGroups['QUẦN ÁO'] = [
				...(categoryGroups['QUẦN ÁO'] || []),
				category,
			];
		} else if (
			category.name.includes('Dụng cụ') ||
			category.name.includes('Găng') ||
			category.name.includes('Giày')
		) {
			categoryGroups['DỤNG CỤ'] = [
				...(categoryGroups['DỤNG CỤ'] || []),
				category,
			];
		} else {
			categoryGroups['PHỔ BIẾN'] = [
				...(categoryGroups['PHỔ BIẾN'] || []),
				category,
			];
		}
	});

	return (
		<div
			ref={sportDropdownRef}
			className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 z-10 flex max-h-[450px] overflow-hidden"
		>
			{/* Phần bên trái - Danh mục */}
			<div className="w-1/4 border-r border-gray-200 flex flex-col bg-gray-50">
				{/* HEADER - Cố định ở trên */}
				<div className="bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 sticky top-0 z-10">
					<div className="flex items-center text-white">
						<i className={`${activeSportIcon} text-xl mr-2`}></i>
						<h3 className="text-lg font-bold">{activeSportName}</h3>
					</div>
				</div>

				{/* DANH SÁCH DANH MỤC - Phần có thể cuộn */}
				<div
					className="overflow-y-auto custom-scrollbar flex-grow"
					style={{ maxHeight: 'calc(100% - 110px)' }}
				>
					{Object.entries(categoryGroups).map(
						([group, items]) =>
							items &&
							items.length > 0 && (
								<div key={group} className="mb-2 pt-2">
									<h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-1">
										{group}
									</h4>
									<ul>
										{items.map((category) => (
											<li key={category.id}>
												<NavLink
													to={`/products?category_id=${category.id}`}
													className={({ isActive }) =>
														`flex items-center px-4 py-2 transition-colors duration-200 ${
															isActive
																? 'bg-blue-100 text-blue-700 font-medium border-l-4 border-blue-600 pl-3'
																: 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-l-4 hover:border-blue-400 hover:pl-3'
														}`
													}
												>
													<span>{category.name}</span>
													<i className="fas fa-chevron-right ml-auto text-xs text-gray-400"></i>
												</NavLink>
											</li>
										))}
									</ul>
								</div>
							)
					)}
				</div>

				{/* FOOTER - Cố định ở dưới */}
				<div className="py-3 px-4 border-t border-gray-200 bg-white sticky bottom-0 z-10 shadow-md">
					<NavLink
						to={`/products?sport_id=${activeSport}`}
						className="flex items-center justify-between py-1 text-blue-600 hover:text-blue-800 font-medium"
					>
						<span>Xem tất cả sản phẩm</span>
						<i className="fas fa-arrow-right text-sm"></i>
					</NavLink>
				</div>
			</div>

			{/* Phần bên phải - Nội dung và banner */}
			<div className="w-3/4 flex flex-col bg-white">
				{/* Banner chính */}
				<div className="p-4 flex-grow">
					<div className="w-full h-64 rounded-lg overflow-hidden shadow-md relative">
						<img
							src={sportBannerImage}
							alt="Sport Banner"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-center">
							<div className="p-6 text-white max-w-md">
								<h2 className="text-2xl font-bold mb-2">
									Khám phá {activeSportName}
								</h2>
								<p className="text-sm mb-4 text-blue-100">
									Trang bị đầy đủ với các sản phẩm chất lượng
									cao dành cho môn{' '}
									{activeSportName.toLowerCase()}.
								</p>
								<NavLink
									to={`/products?sport_id=${activeSport}`}
									className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
								>
									Mua sắm ngay
								</NavLink>
							</div>
						</div>
					</div>
				</div>

				{/* Sản phẩm nổi bật */}
				<div className="bg-gray-50 p-4 border-t border-gray-200">
					<h4 className="text-sm font-semibold text-gray-600 mb-3">
						Sản phẩm nổi bật:
					</h4>
					<div className="grid grid-cols-4 gap-3">
						{[1, 2, 3, 4].map((num) => (
							<div
								key={num}
								className="bg-white rounded-md p-2 shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="h-20 bg-gray-200 rounded-md mb-2 overflow-hidden">
									{/* Placeholder cho ảnh sản phẩm */}
									<div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-200"></div>
								</div>
								<div className="text-xs font-medium text-gray-800 truncate">
									Sản phẩm {activeSportName} #{num}
								</div>
								<div className="text-xs text-blue-600 font-bold mt-1">
									1.200.000₫
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SportDropdown;
