import React, { useState }from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import "./Chat.styles.scss";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsOutlinedIcon from '@material-ui/icons/EmojiEmotionsOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';

function Chat({messages}) {
    const [input, setInput] = useState("");
	return (
		<div className="chat">
			<div className="chat__header">
				<Avatar />
				<div className="chat__headerInfo">
					<h3>Room name</h3>
					<p>Last seen at...</p>
				</div>

				<div className="chat__headerRight">
					<IconButton>
						<SearchOutlinedIcon />
					 </IconButton>
					<IconButton>
						<AttachFileOutlinedIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>

            <div className="chat__body">
                {
                    messages.map( message => (
                        <p className={`chat__message  ${message.recieved && 'chat__reciever'}`}>
                        <span className="chat__name">{message.name}</span>
                    <span>{message.message}</span>
                        <span className="chat__timestamp">
                            {
                                message.timestamp
                            }
                        </span>
                    </p>
                    ))
                }
        
            </div>
            <div className="chat__footer">
                <EmojiEmotionsOutlinedIcon/>
                <form>
                    <input type="text"
                           onChange={(e) => setInput(e.target)}
                           placeholder="Type a message"/>
                    <button
                        >
                        Send a message
                    </button>
                </form>
                <MicNoneOutlinedIcon/>
            </div>
		</div>
	);
}

export default Chat;
