import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


const schema = yup.object({
  name: yup.string().when("$isRegister", {
    is: true,
    then: (s) => s.required("O nome é obrigatório para o cadastro"),
  }),
  username: yup.string().required("Usuário é obrigatório"),
  password: yup.string().min(6, "A senha deve ter no mínimo 6 caracteres").required("Senha obrigatória"),
}).required();

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    context: { isRegister } 
  });

  const toggleMode = () => {
    setIsRegister(!isRegister);
    reset(); 
  };

  const onSubmit = (data) => {
  
    localStorage.setItem('user_name', data.name || data.username);
    localStorage.setItem('token', 'fake-token-123');
    
    console.log("Dados enviados:", data);
    navigate('/home'); 
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">{isRegister ? 'Criar Conta' : 'Fazer Login'}</h2>
          <p className="auth-subtitle">
            {isRegister ? 'Preencha os dados abaixo' : 'Entre com suas credenciais'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {isRegister && (
            <div className="field">
              <label>Nome Completo</label>
              <input 
                {...register("name")} 
                placeholder="Seu nome"
                className={errors.name ? 'input-error' : ''} 
              />
              <small className="error-msg">{errors.name?.message}</small>
            </div>
          )}

          <div className="field">
            <label>Usuário</label>
            <input 
              {...register("username")} 
              placeholder="ex: joao_vitor"
              className={errors.username ? 'input-error' : ''} 
            />
            <small className="error-msg">{errors.username?.message}</small>
          </div>

          <div className="field">
            <label>Senha</label>
            <input 
              type="password" 
              {...register("password")} 
              placeholder="••••••••"
              className={errors.password ? 'input-error' : ''} 
            />
            <small className="error-msg">{errors.password?.message}</small>
          </div>

          <button type="submit" className="btn-primary">
            {isRegister ? 'CADASTRAR' : 'ENTRAR'}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isRegister ? 'Já possui uma conta?' : 'Ainda não tem conta?'}</span>
          <button onClick={toggleMode} className="btn-link">
            {isRegister ? 'Entrar agora' : 'Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}