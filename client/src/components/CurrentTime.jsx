import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import clockIcon from "../assets/clockIcon.svg";

const CurrentTime = () => {
    const [seconds, setSeconds] = useState(String(new Date().getSeconds()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2,"0"));
    const [hours, setHours] = useState(String(new Date().getHours()).padStart(2,"0"));
    const meridiem = useRef(hours > 12 ? "PM" : "AM");
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(String(new Date().getSeconds()).padStart(2,"0"));
            setMinutes(String(new Date().getMinutes()).padStart(2,"0"));
            setHours(String(new Date().getHours()).padStart(2,"0"));
        },1000);
        return () => {
            clearInterval(interval)
        }
    },[]);
    return(
        <span className="flex justify-between items-center gap-1 sm:gap-2">
            <img src={clockIcon} alt="clockIcon" className="w-4 h-4 sm:w-5 sm:h-5"/>
            <h1 className="text-xs sm:text-base">{hours}:{minutes}:{seconds} {meridiem.current}</h1>
        </span>
    )
}

export default CurrentTime;