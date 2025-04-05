import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import Layout from './components/layout/Layout';
import Home from './pages/Home/index.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ProtectedRoute from './pages/Auth/ProtectedRoute.jsx';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoute />}>
					{/* <Route path="profile" element={<Profile />} /> */}
				</Route>

				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
