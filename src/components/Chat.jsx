import React from "react";
import socket from "../socket";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			backgroundColor: "cornsilk",
			width: "45%",
			margin: "0 auto",
			marginTop: "7%",
			padding: "20px",
		},
		info: {
			backgroundColor: "gray",
		},
		list: {
			listStyle: "none",
		},
		form: {
			marginTop: "35%",
		},
		input: {
			display: "block",
			marginBottom: "10px",
		},
		message: {
			backgroundColor: "blue",
			marginTop: "15px",
			width: "20%",
			borderRadius: "8px",
			textAlign: "center",
			padding: "5px",
			color: "white",
		},
	})
);

const Chat = ({ users, messages, userName, roomId, onAddMessage }) => {
	const classes = useStyles();
	const [messageValue, setMessageValue] = React.useState("");
	const messagesRef = React.useRef(null);
	const onSendMessage = () => {
		socket.emit("ROOM:NEW_MESSAGE", {
			userName,
			roomId,
			text: messageValue,
		});
		onAddMessage({ userName, text: messageValue });
		setMessageValue("");
	};

	React.useEffect(() => {
		messagesRef.current.scrollTo(0, 99999);
	}, [messages]);

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={5}>
					<div className={classes.info}>
						Комната: <b>{roomId}</b>
						<hr />
						<b>Онлайн ({users.length}):</b>
						<ul className={classes.list}>
							{users.map((name, index) => (
								<li key={name + index}>{name}</li>
							))}
						</ul>
					</div>
				</Grid>
				<Grid item xs={7}>
					<div className={classes.users}>
						<div ref={messagesRef} className='messages'>
							{messages.map((message) => (
								<div className='message'>
									<p className={classes.message}>{message.text}</p>
									<div>
										<span>{message.userName}</span>
									</div>
								</div>
							))}
						</div>
						<form className={classes.form}>
							<TextField
								className={classes.input}
								value={messageValue}
								onChange={(e) => setMessageValue(e.target.value)}
								id='outlined-multiline-static'
								label='Напишите сообщение'
								multiline
								rows={3}
								defaultValue='Default Value'
								variant='outlined'
							/>
							<Button
								variant='contained'
								color='primary'
								onClick={onSendMessage}
							>
								Отправить
							</Button>
						</form>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default Chat;
