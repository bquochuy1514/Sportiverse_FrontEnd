import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchCategories } from '../../../services/api';
import SportDropdown from './SportDropdown';
import { GiShuttlecock, GiTennisRacket } from 'react-icons/gi';
import {
	FaRunning,
	FaSwimmer,
	FaBiking,
	FaFutbol,
	FaBasketballBall,
	FaFireAlt,
} from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';

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
	function getSportIcon(sportName) {
		switch (sportName.toLowerCase()) {
			case 'bóng đá':
				return <FaFutbol className="text-lg mr-2" />;
			case 'bóng rổ':
				return <FaBasketballBall className="text-lg mr-2" />;
			case 'cầu lông':
				return <GiShuttlecock className="text-lg mr-2" />;
			case 'bơi lội':
				return <FaSwimmer className="text-lg mr-2" />;
			case 'chạy bộ':
				return <FaRunning className="text-lg mr-2" />;
			case 'đạp xe':
				return <FaBiking className="text-lg mr-2" />;
			case 'tennis':
				return <GiTennisRacket className="text-lg mr-2" />;
			case 'gym':
				return <CgGym className="text-lg mr-2" />;
			default:
				return <CgGym className="text-lg mr-2" />;
		}
	}

	return (
		<nav className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-1">
			<div className="w-full max-w-7xl mx-auto px-4">
				<div className="w-full overflow-x-auto scrollbar-hide">
					<ul className="flex items-center justify-start space-x-2 py-1 min-w-max">
						{sports.map((sport) => (
							<li key={sport.id} className="relative">
								<button
									onClick={(e) =>
										handleToggleCategories(sport.id, e)
									}
									className={`sport-item flex items-center px-3.5 py-2 rounded-md transition-all duration-200 ${
										activeSport === sport.id
											? 'bg-blue-600 text-white font-medium shadow-md'
											: 'text-gray-700 hover:bg-blue-500 hover:text-white'
									}`}
								>
									{getSportIcon(sport.name)}
									<span className="whitespace-nowrap font-medium">
										{sport.name}
									</span>
									<i
										className={`fas fa-chevron-down ml-2 text-xs transform transition-transform duration-200 ${
											activeSport === sport.id
												? 'rotate-180'
												: ''
										}`}
									></i>
								</button>
							</li>
						))}
						<li>
							<NavLink
								to="/products/sale"
								className={({ isActive }) =>
									isActive
										? 'flex items-center px-3.5 py-2 bg-red-600 text-white rounded-md font-medium shadow-md'
										: 'flex items-center px-3.5 py-2 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition-all duration-200 font-medium'
								}
							>
								<FaFireAlt className="mr-2" />
								<span className="whitespace-nowrap">
									HOT SALE
								</span>
							</NavLink>
						</li>
					</ul>
				</div>

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
