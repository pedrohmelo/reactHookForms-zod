import { useState } from 'react';
import '../styles/global.css';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { Navigate } from "react-router-dom";

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

function LoginPage() {
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
      className= ' h-screen w-screen flex items-center justify-center bg-gray-200'
    >
        <form 
          className='flex flex-col gap-2 border bg-gray-100 border-gray-500 p-10 rounded-t-lg'
          onSubmit={handleSubmit(showDataLogin) }
        >
          <div className='flex flex-row gap-2'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
            </svg>

            <label 
              htmlFor="email" 
              className='flex flex-row '
            >
              E-mail
            </label>
            <input 
              type="email" 
              className='border border-gray-300 rounded-md px-2 py-1 w-60'
              {...register('email')} //só aceita campos validados no schema
            />

            {/* verificação de erros na tela do usuário via componente span */}
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div className='flex flex-row gap-2'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>

            <label htmlFor="password">Password</label>
            <input 
              type="password"
              className='border border-gray-300 rounded-md px-2 py-1 w-60'
              {...register('password')} //só aceita campos validados no schema
            />

            {/* verificação de erros na tela do usuário via componente span */}
            {errors.password && <span>{errors.password.message}</span>}

          </div>

          <div className='flex flex-row gap-2'>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
            </svg>

            <label htmlFor="password">Confirm Password</label>
            <input 
              type="confirmedPassword"
              className='border border-gray-300 rounded-md px-2 py-1 w-60'
              {...register('confirmedPassword')} //só aceita campos validados no schema
            />

            {/* verificação de erros na tela do usuário via componente span */}
            {errors.confirmedPassword && <span>{errors.confirmedPassword.message}</span>}

          </div>

          <button 
            type='submit'
            className='flex flex-row rounded-md px-4 py-2 font-bold bg-red-400 hover:bg-red-600 text-white w-20'
            
          >
            Login
          </button>
        </form>

        <div>{output}</div>
    </main>
  )
}

export default LoginPage