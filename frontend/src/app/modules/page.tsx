"use client";

import "./modules_landing_page.css"
import modules from "../../../module_details/landing_details.json";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { authenticatedFetch } from "../services/authService";

/*Welcome message should specify the user's name */
/*Code in course completion based on number of trainings*/
/*Progression should be based on the user */
type UserData = {
  email: string;
  // add other fields if needed
};

function PhishingIcon() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 72 72" fill="none">
        <path d="M50.9063 6.32812C50.9063 2.8388 48.0675 0 44.5781 0C41.0888 0 38.25 2.8388 38.25 6.32812C38.25 9.02517 39.9466 11.3323 42.3281 12.2414V22.0781H46.5469V12.3411C49.0749 11.5113 50.9063 9.13022 50.9063 6.32812ZM44.5781 8.4375C43.415 8.4375 42.4688 7.49123 42.4688 6.32812C42.4688 5.16502 43.415 4.21875 44.5781 4.21875C45.7412 4.21875 46.6875 5.16502 46.6875 6.32812C46.6875 7.49123 45.7412 8.4375 44.5781 8.4375Z" fill="#EA3D2C"/>
        <path d="M67.0781 72H4.92188C2.20795 72 0 69.792 0 67.0781V26.2969C0 23.583 2.20795 21.375 4.92188 21.375H67.0781C69.792 21.375 72 23.583 72 26.2969V67.0781C72 69.792 69.792 72 67.0781 72Z" fill="#E1E4F9"/>
        <path d="M67.0781 21.375H36V72H67.0781C69.792 72 72 69.7921 72 67.0781V26.2969C72 23.583 69.792 21.375 67.0781 21.375Z" fill="#D6DAF6"/>
        <path d="M36.7734 34.7343C30.5314 34.7343 25.4531 29.656 25.4531 23.414V10.828C25.4531 8.95278 27.7286 8.01102 29.054 9.33655L33.2727 13.5553C34.0965 14.3789 34.0965 15.7146 33.2727 16.5384C32.4491 17.3622 31.1134 17.3622 30.2896 16.5384L29.6719 15.9205V23.414C29.6719 27.3298 32.8576 30.5155 36.7734 30.5155C37.9384 30.5155 38.8828 31.46 38.8828 32.6249C38.8828 33.7898 37.9384 34.7343 36.7734 34.7343Z" fill="#F0725F"/>
        <path d="M61.3125 42.4688H40.3594C39.1944 42.4688 38.25 41.5243 38.25 40.3594C38.25 39.1944 39.1944 38.25 40.3594 38.25H61.3125C62.4774 38.25 63.4219 39.1944 63.4219 40.3594C63.4219 41.5243 62.4774 42.4688 61.3125 42.4688Z" fill="#4B5ADD"/>
        <path d="M61.3125 50.9062H40.2188C39.0538 50.9062 38.1094 49.9618 38.1094 48.7969C38.1094 47.6319 39.0538 46.6875 40.2188 46.6875H61.3125C62.4774 46.6875 63.4219 47.6319 63.4219 48.7969C63.4219 49.9618 62.4774 50.9062 61.3125 50.9062Z" fill="#4B5ADD"/>
        <path d="M57.0938 59.3438H40.3594C39.1944 59.3438 38.25 58.3993 38.25 57.2344C38.25 56.0694 39.1944 55.125 40.3594 55.125H57.0938C58.2587 55.125 59.2031 56.0694 59.2031 57.2344C59.2031 58.3993 58.2587 59.3438 57.0938 59.3438Z" fill="#4B5ADD"/>
        <path d="M31.7813 63.5625H10.6875C9.52256 63.5625 8.57812 62.6181 8.57812 61.4531V59.3438C8.57812 52.3651 14.2557 46.6875 21.2344 46.6875C28.213 46.6875 33.8906 52.3651 33.8906 59.3438V61.4531C33.8906 62.6181 32.9462 63.5625 31.7813 63.5625Z" fill="#7A86E8"/>
        <path d="M21.2344 50.9062C16.5819 50.9062 12.7969 47.1212 12.7969 42.4688C12.7969 37.8163 16.5819 34.0312 21.2344 34.0312C25.8868 34.0312 29.6719 37.8163 29.6719 42.4688C29.6719 47.1212 25.8868 50.9062 21.2344 50.9062Z" fill="#7A86E8"/>
        <path d="M36.7734 30.5155C36.512 30.5155 36.2542 30.5004 36 30.4727V34.7049C36.2559 34.7223 36.5131 34.7343 36.7734 34.7343C37.9384 34.7343 38.8828 33.7899 38.8828 32.6249C38.8828 31.46 37.9384 30.5155 36.7734 30.5155Z" fill="#EA3D2C"/>
        </svg>
    )
}

function GreenDotIcon(){
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="5" fill="#62BDA0"/>
        </svg>
    )
}

export default function Modules() {
    const progress = 0;
    const currentModule = modules[0];
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const res = await authenticatedFetch(`http://localhost:8000/users/me`);
                    const json = await res.json();
                    setUserData(json.data);
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            }
        });
        return () => unsubscribe();
    }, []);
    return(
        <div className="modules">
            <div className="modules_header">
                <div className="dashboard_introduction">
                    <h2>Dashboard</h2>
                    <h1>Welcome Back, <b>{userData?.email ?? "Guest"}</b>!</h1>
                </div>
                <div className="course_completion_count">
                    <h3>2/2</h3>
                    <h2>required</h2>
                </div>
            </div>

            <div className="quick_process">
                <h2 className="quick_process_intro">Module Quick Continue Progress <GreenDotIcon/></h2>
                <div className="training_in_progress">
                    <h1>
                        <img
                        src={currentModule.icon}
                        alt={currentModule.title}
                        className="module_icon"
                        />
                        {currentModule.title}
                    </h1>
                    <button>Complete →</button>
                </div>
                <div className="progress_tracker">
                        <div className="progress_bar">
                            <div className="progress_fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <h2>{progress}% Complete</h2>
                </div>
            </div>

            <div className="cont_required_training">
                <h1>Continue Required Training → </h1>
                <div className="module_cards">
                    {modules.map((module) => (
                        <Link
                            href={module.route}
                            key={module.id}
                            className="module_card_link"
                        >
                            <div className="module_card">
                                <div className="module_badge status">REQUIRED</div>

                                <img
                                    src={module.icon}
                                    alt={module.title}
                                    className="module_card_icon"
                                />

                                <h2>{module.title}</h2>
                                <p>{module.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

