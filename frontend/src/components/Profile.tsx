import React, { useState, useEffect } from "react";
import { ReactComponent as SettingsIcon } from '../assets/settings-24.svg';
import { ReactComponent as HeartIcon } from '../assets/Vector.svg';
import { ReactComponent as Rectangle } from '../assets/Rectangle 1667.svg'
import { ReactComponent as Ellipse } from '../assets/Ellipse 3.svg'
import { ReactComponent as Chevron } from '../assets/chevron-down-16.svg'
import { ReactComponent as SmallEllipse } from '../assets/Ellipse 191.svg'
import { ReactComponent as DashboardIcon } from '../assets/dashboard.svg'
import { ReactComponent as NotificationIcon } from '../assets/notification.svg'
import { ReactComponent as BenefitsIcon } from '../assets/benefits.svg'

import { IUser} from "../data/model";
import { getUserByName } from "../data/queries";

import '../styles/Profile.css';

export const Profile = () => {
    const [profile, setProfile] = useState<IUser>();

    useEffect(() => {
        getProfile()
    }, [profile])

    async function getProfile() {
        const myProfile = await getUserByName('Porin Marko');
        setProfile(myProfile);
    }

    return (
        <div className="profile">
            <div className="main_profile">
                <div className="main_frame">
                    <div className="avatar">
                        <Ellipse></Ellipse>
                    </div>
                    <div className="text_information">
                        <div className="name">Mari</div>
                        <div className="location">00530, Helsinki</div>
                        <div className="small_text">
                            <div className="flex-row">
                                <div>387</div>
                                <HeartIcon className="heart"/>
                            </div>
                            <SmallEllipse className="small_ellipse"/>
                            <div>1 200 Followers</div>
                            <SmallEllipse className="small_ellipse"/>
                            <div>2 500 Following</div>
                        </div>
                    </div>
                </div>
                <SettingsIcon className="settings"/>
            </div>
            <div className="personal_information"> 
                <Chevron />
                <div>Personal Information</div>
                <Rectangle className="rectangle"/>
            </div>
            <div className="navigation">
                <DashboardIcon />
                <NotificationIcon />
                <BenefitsIcon />
            </div>
            <div className="navigation">
                <div>Dashboard</div>
                <div>Notifications</div>
                <div>Benefits</div>
            </div>
            <div className="benefitsContainer">
                <div className="wellDone">Well done Mari!</div>
                <div className="heartsText">You have gotten already</div>
                <div className="heartsText">387 hearts from other users!</div>
            </div>
        </div>
    );
}