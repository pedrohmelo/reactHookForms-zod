import { useState } from 'react';
import './styles/global.css';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'

//Schema sempre será uma representação de qualquer estrutura de dados
const createFormSchema = 

z.object({
  email: z.string().min(1).email('Padrão de email incorreto.'),
  password: z.string().min(4, 'Senha deve conter no mínimo 4 caracteres.'),
  confirmedPassword :z.string().min(4, 'Senha deve conter no mínimo 4 caracteres.')
})
  .superRefine(({ confirmedPassword, password }, ctx) => {
    if (confirmedPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'As senhas não conferem',
        });
    }}
  ) //Falta mostrar na tela que as senhas não conferem.


type fon = z.infer<typeof createFormSchema>

function App() {
  //register registra o campo de um forms e vincula esse campo ao estado interno do forms
  const {register, handleSubmit, formState: {errors}} = useForm<fon>(
    {resolver: zodResolver(createFormSchema)}
  );
  
  const [output, setOutput] = useState('');

  function showDataLogin(data: any){
    setOutput(JSON.stringify(data, null, 2))
  }


  return (
    <main 
      className='h-screen flex flex-col gap-5 items-center justify-center bg-gray-200'
    >
        <form 
          className='gap-2 flex flex-col'
          onSubmit={handleSubmit(showDataLogin) }
        >
          <div className='flex flex-row gap-2'>
            <label 
              htmlFor="" 
              className='flex flex-row bg-slate-600'
            >
              E-mail
            </label>
            <input 
              type="email" 
              className='border border-red-400 px-2'
              {...register('email')} //só aceita campos validados no schema
            />

            {/* verificação de erros na tela do usuário via componente span */}
            {errors.email && <span>{errors.email.message}</span>}

          </div>

          <div className='flex flex-row gap-2'>
            <label htmlFor="">Password</label>
            <input 
              type="password"
              className='border border-red-400 px-2'
              {...register('password')} //só aceita campos validados no schema
            />

            {/* verificação de erros na tela do usuário via componente span */}
            {errors.password && <span>{errors.password.message}</span>}

          </div>

          <div className='flex flex-row gap-2'>
            <label htmlFor="">Confirm Password</label>
            <input 
              type="confirmedPassword"
              className='border border-red-400 px-2'
              {...register('confirmedPassword')} //só aceita campos validados no schema
            />

            {/* verificação de erros na tela do usuário via componente span */}
            {errors.confirmedPassword && <span>{errors.confirmedPassword.message}</span>}

          </div>

          <button 
            type='submit'
            className='rounded-md font-bold bg-red-400 hover:bg-red-600'
          >
            Login
          </button>
        </form>

        <div>{output}</div>
    </main>
  )
}

export default App
