import { useState } from "react"
import { useNavigate, useParams } from "react-router"

import fileSvg from "../assets/file.svg"
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories"

import { Input } from "../components/Input"
import { Select } from "../components/Select"
import { Upload } from "../components/Upload"
import { Button } from "../components/Button"

export function Refund() {
  const [name, setname] = useState("")
  const [amount, setamount] = useState("")
  const [category, setcategory] = useState("")
  const [isLoading, setisLoading] = useState(false)
  const [filename, setfilename] = useState<File | null>(null)

  const navigate = useNavigate()
  const params = useParams<{id: string}>()
 

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()

    if(params.id){
      return navigate(-1)
    }

    console.log(name, amount, category, filename)
    navigate("/confirm", {state:{ fromSubmit: true}})
  }

  return (
  
   <form onSubmit={onSubmit} className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-[512px] ">
    <header>
      <h1 className="text-xl font-bold text-gray-100">Solicitação de reembolso</h1>
      
      <p className="text-sm text-gray-200 mt-2 mb-4">Dados 
        da despesa para solicitar reembolso.</p>
    </header>
    <Input 
     required
     legend="Nome da solicitação"
     value={name}
     onChange={(e) =>setname(e.target.value)}
     disabled={!!params.id}
     />

    <div className="flex gap-4">
    <Select 
      required
      legend="Categoria" 
      value={category}
      onChange={(e) => setcategory(e.target.value)}
      disabled={!!params.id}>

    {CATEGORIES_KEYS.map((category) => (
      <option key={category} value={category}>{CATEGORIES[category].name}</option>
    ))}
    </Select>
    
    <Input 
      required
      legend="Valor"
      value={amount}
      onChange={(e) =>setamount(e.target.value)} 
      disabled={!!params.id}/>
    </div>

    {
      params.id ? (
        <a 
        href="https://www.rocketseat.com.br/" 
        target="_blank"
        className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 my-6 hover:opacity-70 transition ease-linear">
          <img src={fileSvg} alt="Ícone de arquivo"/>
          Visualizar comprovante
        </a>
      ) :(

    <Upload 
      filename={filename && filename.name}
      onChange={(e) => e.target.files && setfilename(e.target.files[0])}
    />
      )}

    <Button type="submit" isLoading={isLoading}>
      {params.id ? "voltar" : "Enviar"}
    </Button>
   </form>
    
  )
}