import React, { useState } from 'react'
import bgImg from '../../assets/img1.jpg'
import { useForm } from 'react-hook-form';
import api from '../../services/axios';

export default function CreatePassword(props) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = useState();

    const handlerSetIsSuccessfullySubmitted = (response) => {
        setIsSuccessfullySubmitted(response.success);
    }

    async function onSubmit(data) {
        const token = localStorage.getItem('token')

        const authorization = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        try {

            var response = await api.post('/api/panelpassword/createpassword', data, authorization)
            props.handlerExisteNovaSenha();
            
            handlerSetIsSuccessfullySubmitted(response);
        } catch (error) {
            console.log(error.message)
        }

    }

    // console.log(watch('username'));

    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Insira nova senha no painel</h2>

                    <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" {...register("servicedesk")} placeholder='Guichê' />
                        <input type="text" {...register("password")} placeholder='Senha' />
                        <button className='btn'>Inserir Senha</button>
                        {
                            isSuccessfullySubmitted ?
                                <h3>Senha criada com sucesso</h3>
                                :
                                null
                        }

                    </form>

                </div>
                <div className="col-2">
                    {/* <img src={bgImg} alt="" /> */}
                </div>
            </div>
        </section>
    )
}
