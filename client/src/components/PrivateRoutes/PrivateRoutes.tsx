import {message} from "antd";
import {useState,useEffect} from "react";
import {Outlet,Navigate} from "react-router-dom";
import Loader from "../Loader/Loader";
const PrivateRoutes = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading,setIsLoading]=useState<boolean>(true);
    useEffect(()=>{
        const token=localStorage.getItem("userToken");
        if(!token){
            setIsLoggedIn(false);
            setIsLoading(false);
            message.error("You must be logged in to access this page");
            return;
        }
        setIsLoggedIn(true);
        setIsLoading(false);

    },[])

        return (
            <Loader isLoading={isLoading}>
            {isLoggedIn ? <Outlet/> : <Navigate to="/"/>}
            </Loader>
            )
    
}
export default PrivateRoutes;