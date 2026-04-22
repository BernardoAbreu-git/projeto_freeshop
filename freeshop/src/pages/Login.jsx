import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

//esquema de validação? talvez...
const schema = yup.object({
  username: yup.string().required("O nome de usuário é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("Senha obrigatória"),
}).required();

export default function Login() {
  const navigate = useNavigate();
  
  //config do hook 
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  //Função para enviar os dados para a FakeStoreAPI
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', data);
      localStorage.setItem('token', response.data.token); //armazenar o JWT 
      navigate('/dashboard'); //faz ir pra tal rota protegifda
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Fazer Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="input-label">Usuário</label>
            <input 
              {...register("username")}
              className={`login-input ${errors.username ? 'input-error' : ''}`}
              placeholder="Digite seu usuário"
            />
            <p className="error-message">{errors.username?.message}</p>
          </div>

          <div>
            <label className="input-label">Senha</label>
            <input 
              type="password"
              {...register("password")}
              className={`login-input ${errors.password ? 'input-error' : ''}`}
              placeholder="••••••••"
            />
            <p className="error-message">{errors.password?.message}</p>
          </div>

          <button type="submit" className="login-button">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}