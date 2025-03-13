import { useState } from "react"
import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

import { api } from "../services/api"

import { Button } from "../components/Button"
import { Input } from "../components/Input"

const signUpSchema = z.object({
  name: z.string().trim().min(1, { message: "Informe o nome" }),
  email: z.string().email({message: "E-mail inválido"}),
 password: z.string().min(6, {message: "A senha deve ter no mínimo 6 caracteres"}),
 passwordConfirm: z.string({message: "Confirme a senha"}),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "As senhas não conferem",
  path: ["passwordConfirm"],
})

export function SignUp(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    
    try {
      setIsLoading(true)

      const data = signUpSchema.parse({
        name,
        email,
        password,
        passwordConfirm
      })
      
      await api.post("/users", data)

      if(confirm("Cadastrado com sucesso. Deseja fazer login?")){
        navigate("/")
      }

    } catch (error) {
      console.log(error)
      if(error instanceof ZodError){
        return alert(error.issues[0].message)
      }

      if(error instanceof AxiosError){
        return alert(error.response?.data.message)
      }

      alert("Não foi possível realizar o cadastro")
    }finally{
      setIsLoading(false)
    }
  }


  return(
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">

      <Input
       required
       legend="nome"
       type="name"
       placeholder="Digite seu nome"
       onChange={(e) => setName(e.target.value)}
       />

      <Input
       required
       legend="E-mail"
       type="email"
       placeholder="seu@email.com"
       onChange={(e) => setEmail(e.target.value)}
       />

      <Input
       required
       legend="Senha"
       type="password"
       placeholder="123456"
       onChange={(e) => setPassword(e.target.value)}
       />

      <Input
       required
       legend="Confirme a senha"
       type="password"
       placeholder="123456"
       onChange={(e) => setPasswordConfirm(e.target.value)}
       />

       <Button type="submit" isLoading={isLoading}
       >Cadastrar
       </Button>

       <a
        href="/"
        className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease-linear">
         Já tenho uma conta
          </a>
    </form>
  )
}