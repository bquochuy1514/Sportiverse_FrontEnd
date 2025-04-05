import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [user, setUser] = useState(null);

	async function getUser() {
		const res = await fetch('/api/profile', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await res.json();
		if (res.ok) {
			setUser(data);
		} else {
			console.error('Error fetching user:', data.message);
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
