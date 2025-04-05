import { useState } from 'react';

const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		console.log('Tìm kiếm:', searchQuery);
		// Thêm logic tìm kiếm ở đây
	};

	return (
		<form onSubmit={handleSearch} className="flex-grow mx-8">
			<div className="relative">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder="Tìm kiếm sản phẩm"
					className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
			</div>
		</form>
	);
};

export default SearchBar;
