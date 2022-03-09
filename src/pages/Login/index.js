import React from 'react'
import bgImg from '../../assets/painel.png'
import { useForm } from 'react-hook-form';
import api from '../../services/axios';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login(props) {

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm()
    const navigate = useNavigate();

    async function onSubmit(data) {
        try {
            const response = await api.post('/api/account/loginuser', data);

            localStorage.setItem('email', data.email);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('expiration', response.data.expiration);

            props.handlerSetIsLoggedIn();
            navigate('/CreatePassword')
        } catch (error) {

            setError('login', {
                type: "server",
                message: 'Senha ou E-mail incorreto',
            });
        }

    }

    return (
        <section>
            <div className="register">
                <div className="col-1">
                    <h2>Login Painel de senhas</h2>
                    <br />
                    <h3>Acesso apenas para administradores</h3>
                    <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <input className='form-control form-control-lg' type="text" {...register("email")} placeholder='email' />
                        <input className='form-control form-control-lg' type="text" {...register("password")} placeholder='password' />
                        <button className='btn'>Login</button>
                        <div >{errors.login?.message}</div>
                    </form>

                </div>
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
            </div>
        </section>
    )
}