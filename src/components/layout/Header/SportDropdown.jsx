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

	return (
		<div
			ref={sportDropdownRef}
			className="absolute left-0 right-0 top-full mt-4 bg-white rounded-md shadow-lg z-10 flex max-h-100 overflow-y-auto"
		>
			{/* Danh sách danh mục bên trái */}
			<div className="w-1/4 border-r py-4 overflow-y-auto">
				<div className="flex items-center justify-between px-4 mb-2">
					<h3 className="text-lg font-bold">{activeSportName}</h3>
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
								index !== categories.length - 1
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
	);
};

export default SportDropdown;
