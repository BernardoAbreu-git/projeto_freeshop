import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Fazer Login</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

{/*user*/}  
        <div>
            <label className="block text-sm text-gray-600">Usuário</label>
            <input 
              {...register("username")}
              className={`w-full p-2 border rounded mt-1 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            />
            <p className="text-red-500 text-xs mt-1">{errors.username?.message}</p>
          </div>

{/*senha*/}
          <div>
            <label className="block text-sm text-gray-600">Senha</label>
            <input 
              type="password"
              {...register("password")}
              className={`w-full p-2 border rounded mt-1 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}