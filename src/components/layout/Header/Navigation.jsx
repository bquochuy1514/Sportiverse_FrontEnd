import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../../services/api';
import SportDropdown from './SportDropdown';

const Navigation = ({ sports }) => {
	const [activeSport, setActiveSport] = useState(null);
	const [categories, setCategories] = useState([]);

	// Xử lý click để hiển thị danh mục
	const handleToggleCategories = async (sportId, e) => {
		e.stopPropagation();

		if (activeSport === sportId) {
			setActiveSport(null);
			setCategories([]);
		} else {
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
		<nav className="bg-gray-100 py-2">
			<div className="container mx-auto px-4 relative">
				<ul className="flex space-x-6">
					{sports.map((sport) => (
						<li key={sport.id} className="relative">
							<div className="flex items-center">
								<span
									onClick={(e) =>
										handleToggleCategories(sport.id, e)
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

				<SportDropdown
					activeSport={activeSport}
					setActiveSport={setActiveSport}
					categories={categories}
					sports={sports}
				/>
			</div>
		</nav>
	);
};

export default Navigation;
