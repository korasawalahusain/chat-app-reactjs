import axios from 'axios';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import React, { useEffect, useState, useRef } from 'react';
import { ChatContainer, Contacts, Welcome } from '../components';

export default function Chat() {
	const navigate = useNavigate();
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);
	const [currentUser, setCurrentUser] = useState(undefined);

	useEffect(() => {
		(async () => {
			if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
				navigate('/login');
			} else {
				setCurrentUser(
					await JSON.parse(
						localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
					)
				);
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (currentUser) {
			socket.current = io(host);
			socket.current.emit('add-user', currentUser.id);
		}
	}, [currentUser]);

	useEffect(() => {
		(async () => {
			if (currentUser) {
				if (currentUser.isAvatarImageSet) {
					const data = await axios.get(`${allUsersRoute}/${currentUser.id}`);
					if (data.data.status) {
						setContacts(data.data.users);
					}
				} else {
					navigate('/setAvatar');
				}
			}
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	return (
		<>
			<Container>
				<div className="container">
					<Contacts contacts={contacts} changeChat={handleChatChange} />
					{currentChat === undefined ? (
						<Welcome />
					) : (
						<ChatContainer currentChat={currentChat} socket={socket} />
					)}
				</div>
			</Container>
		</>
	);
}

const Container = styled.div`
	background-color: #131324;
	.container {
		height: 100vh;
		width: 100vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			grid-template-columns: 35% 65%;
		}
	}
`;
