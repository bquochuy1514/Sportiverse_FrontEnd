import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [user, setUser] = useState(null);

	async function getUser() {
		if (!token) {
			setUser(null);
			return;
		}

		try {
			const res = await fetch('/api/profile', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();
			if (res.ok) {
				setUser(data); // Lưu thông tin user (bao gồm avatar) vào state
			} else {
				console.error('Error fetching user:', data.message);
				setToken(null);
				localStorage.removeItem('token');
				setUser(null); // Reset user nếu lỗi
			}
		} catch (error) {
			console.error('Network error:', error);
			setToken(null);
			localStorage.removeItem('token');
			setUser(null);
		}
	}

	useEffect(() => {
		if (token) {
			getUser();
		}
	}, [token]);

	return (
		<AuthContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
