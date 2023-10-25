import Sidebar from "../SideBar/SideBar.js"
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, } from 'react'
import './Home.css'

export default function Home(){

    const location = useLocation();
    const access = location.state ? location.state.access : null;
    const directionAccess = location.state ? location.state.directionAccess : null;
    const [currentUser, setCurrentUser] = useState(() => location.state ? location.state.user : null);

    return (
        <div className="Home">
            <Sidebar access={access} directionAccess={directionAccess} user={currentUser}/>
            <div className="Home-Titles">
                <div className="Home-FirstTitle">Welcome to Easy<span className="Home-LogoTitle">Restaurant</span> Application</div>
                <div className="Home-SecondTitle">Your restaurant management application</div>
                {access == false &&<div className="Home-ThirdTitle">To access the data please login</div>}
            </div>
        </div>
    )
}