import React from 'react';
import SetAvatar from './components/SetAvatar';
import { ChatPage, LoginPage, RegisterPage } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/setAvatar" element={<SetAvatar />} />
				<Route path="/" element={<ChatPage />} />
			</Routes>
		</BrowserRouter>
	);
}
