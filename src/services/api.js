const API_BASE_URL = '/api'; // Proxy đã được thiết lập trong vite.config.js

export const fetchSports = async () => {
	const response = await fetch(`${API_BASE_URL}/sports`);
	if (!response.ok) throw new Error('Failed to fetch sports');
	const result = await response.json();
	return result.sports; // Lấy mảng sports từ data.sports
};

export const fetchCategories = async (sportId) => {
	const response = await fetch(
		`${API_BASE_URL}/categories?sport_id=${sportId}`
	);
	if (!response.ok) throw new Error('Failed to fetch categories');
	const result = await response.json();
	return result.categories.data; // Lấy mảng categories từ data.categories
};

export const fetchProducts = async (categoryId) => {
	const response = await fetch(
		`${API_BASE_URL}/products?category_id=${categoryId}`
	);
	if (!response.ok) throw new Error('Failed to fetch products');
	return response.json();
};

export const fetchCart = async (userId) => {
	const response = await fetch(`${API_BASE_URL}/cart?user_id=${userId}`);
	if (!response.ok) throw new Error('Failed to fetch cart');
	return response.json();
};

export const addToCart = async (userId, productId, quantity) => {
	const response = await fetch(`${API_BASE_URL}/cart`, {
		method: 'POST',
		body: JSON.stringify({
			user_id: userId,
			product_id: productId,
			quantity,
		}),
	});
	if (!response.ok) throw new Error('Failed to add to cart');
	return response.json();
};

// Bạn có thể thêm các hàm khác như fetchOrders, fetchReviews, v.v. tương tự
