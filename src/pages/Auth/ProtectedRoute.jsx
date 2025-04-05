// src/components/auth/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = () => {
	const { user } = useAuth();

	if (!user) {
		// Chuyển hướng đến trang đăng nhập nếu không có người dùng
		return <Navigate to="/login" replace />;
	}

	// Render các route con
	return <Outlet />;
};

export default ProtectedRoute;
