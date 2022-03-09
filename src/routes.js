import React, { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePassword from "./pages/CreatePassword";
import ServiceDesk from "./pages/ServiceDesk";
import Login from "./pages/Login";

export default function RoutesPage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isNovaSenha, setNovaSenha] = useState(false);

    const handlerSetIsLoggedIn = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    
    const handlerExisteNovaSenha = () => {
        setNovaSenha(!isNovaSenha)
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login handlerSetIsLoggedIn={handlerSetIsLoggedIn} />} />
                {
                    isLoggedIn ?

                        <Route path="/CreatePassword" element={<CreatePassword handlerExisteNovaSenha= {handlerExisteNovaSenha}/>} />

                        :
                        null
                }
                <Route path="/ServiceDesk" element={<ServiceDesk isNovaSenha = {isNovaSenha}/>} />

            </Routes>
        </BrowserRouter>
    )
}