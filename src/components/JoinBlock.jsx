import axios from "axios";
import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			display: "grid",
			width: "40%",
			margin: "0 auto",
			paddingTop: "40px",
		},
	})
);

const JoinBlock = ({ onLogin }) => {
	const classes = useStyles();
	const [roomId, setRoomId] = React.useState("");
	const [userName, setUserName] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const onEnter = async () => {
		if (!userName | !roomId) {
			return alert("Неверные данные");
		}
		const obj = { roomId, userName };
		setIsLoading(true);
		await axios.post("/rooms", obj);
		onLogin(obj);
	};
	return (
		<div className={classes.root}>
			<TextField
				id='outlined-secondary1'
				label='Romm ID'
				variant='outlined'
				color='secondary'
				value={roomId}
				onChange={(e) => setRoomId(e.target.value)}
			/>
			<TextField
				id='outlined-secondary1'
				label='Ваше Имя'
				variant='outlined'
				color='secondary'
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
			<Button
				variant='contained'
				disabled={isLoading}
				onClick={onEnter}
				color='primary'
				href='#contained-buttons'
			>
				{isLoading ? "ВХОД..." : "ВОЙТИ"}
			</Button>
		</div>
	);
};

export default JoinBlock;
