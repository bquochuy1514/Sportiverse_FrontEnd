import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchSports } from '../../services/api';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function Layout() {
	const [sports, setSports] = useState([]);

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

	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			{/* Header */}
			<Header sports={sports} />

			{/* Main content */}
			<main className="flex-grow container mx-auto px-4 py-4">
				<Outlet />
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
}
