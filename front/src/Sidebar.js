import React from 'react'
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import "./Sidebar.css"
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                    <IconButton >
                        {/* permet d'afficher l'avatar si il n'y a pas d'images */}
                    <Avatar src=""/>
                    </IconButton>
                <div className="sidebar__headerRight">
                    {/* créer un effet de bouton en entourant une icone */}
                
                    <IconButton >
                    <ChatIcon/>
                    </IconButton>

                    <IconButton >
                    <DonutLargeIcon />
                    </IconButton>
                    <IconButton >
                    <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                  <SearchOutlinedIcon />
                  <input type="text" placeholder="Search or start new chat"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat/>
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        </div>
    )
}

export default Sidebar
