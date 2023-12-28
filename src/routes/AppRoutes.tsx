import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../screens/HomePage";
import LoginPage from "../screens/LoginPage";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<LoginPage/>} />
                <Route path = "/homepage" element = {<HomePage/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;