import React, { useState, useEffect } from 'react';
import api from '../../services/axios';
export default function ServiceDesk(props) {

    const [senhas, setSenhas] = useState([]);

    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }

    useEffect(()=>{
        api.get("/api/panelpassword/GetLastFivePassword", authorization)
            .then(response => { setSenhas(response.data); }, token)

        const interval=setInterval(()=>{
            console.log("Executando setInterVal");
        api.get("/api/panelpassword/GetLastFivePassword", authorization)
            .then(response => { setSenhas(response.data); }, token)
         },3000)

         console.log("Limpando setInterVal");
         return()=>clearInterval(interval)

    },[])

    const ultimaSenha = senhas?.[0];

    return (
        <section>
            <div className='panel'>
                <div className='ultimasenha'>
                    <h2>Ultimas senhas chamadas</h2>
                    <div>
                        {senhas?.map(senha => (
                            <div className='divider'>
                                <b>Senha: </b>{senha.password}<br />
                                <b>Guichê: </b>{senha.serviceDesk}<br /><br />
                            </div>
                        ))}

                    </div>

                </div>

                <div className='senhaatual'>
                    <div>
                            <h4>Senha Atual </h4><br />
                            <b>Senha: </b>{ultimaSenha?.password}<br />
                            <b>Guichê: </b>{ultimaSenha?.serviceDesk}<br /><br />
                    </div>
                </div>
            </div>

        </section>
    )
}