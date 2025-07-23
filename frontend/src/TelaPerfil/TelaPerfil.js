import { useState } from "react";
import Barra from "../componentes/Barra/Barra"
import styles from "./TelaPerfil.module.css";


export default function TelaPerfil({
  nome = "Ana Rodrigues", 
  foto = "/avatar1.png", 
  cronograma1 = "aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
  cronograma2 = "desenvolvimento de software", 
  cronograma3 = "programação"
  } ) {

  const [aberto1, setAberto1] = useState(false);
  const [aberto2, setAberto2] = useState(false);
  const [aberto3, setAberto3] = useState(false);


  return(
    // Div geral
    <div className="bg-[#72ACD2] max-w-screen h-auto flex justify-center flex-col items-center overflow-x-hidden">
      
      <Barra/>

      {/* Card do perfil */}
      <div className="w-4/5 h-full bg-white rounded-3xl shadow-2xl mt-10">
        

        {/* Parte de cima do card, com o título "Perfil" e a foto do usuário */}
        <div className="flex w-full flex-col items-center border-b-2 border-gray-300 mb-10 pb-5">
          
          {/* Título perfil */}
          <div className="bg-[#004E7E] w-full py-2 flex justify-center rounded-b-3xl rounded-t-3xl mb-6">
            <h1 className="text-white font-bold text-3xl align-top h-10">Perfil</h1>
          </div>

          <img className="w-28 h-28 rounded-full border-[#004E7E] border-4" src={foto}/>
          <h1 className="text-[#004E7E] text-3xl font-bold align-top">{nome}</h1>

        </div>

        <h1 className="text-[#004E7E] text-xl font-bold align-top mx-5 mb-5">Seus cronogramas mais recentes</h1>
        
        {/* Visualizar cronogramas */}

        {/* Cronograma 1 */}
        <div className="ml-6 w-10/12 max-h-96 overflow-y-auto  bg-[#004E7E] hover:cursor-pointer hover:opacity-90 rounded-lg px-4 py-3 mb-5" onClick={() => setAberto1(!aberto1)}>
          <p className="text-white font-bold text-lg">Cronograma 1</p>
          {aberto1 && (
            <div className="text-white break-words overflow-x-auto bg-[#004E7E] mt-2">{cronograma1}</div>)
          }
        </div>

        {/* Cronograma 2 */}
        <div className="ml-6 w-10/12 max-h-96 overflow-y-auto  bg-[#004E7E] hover:cursor-pointer hover:opacity-90 rounded-lg px-4 py-3 mb-5" onClick={() => setAberto2(!aberto2)}>
          <p className="text-white font-bold text-lg">Cronograma 2</p>
          {aberto2 && (
            <div className="text-white break-words overflow-x-auto bg-[#004E7E] mt-2">{cronograma2}</div>)
          }
        </div>


        {/* Cronograma 3 */}
        <div className="ml-6 w-10/12 max-h-96 overflow-y-auto  bg-[#004E7E] hover:cursor-pointer hover:opacity-90 rounded-lg px-4 py-3 mb-5" onClick={() => setAberto3(!aberto3)}>
          <p className="text-white font-bold text-lg ">Cronograma 3</p>
          {aberto3 && (
            <div className="text-white break-words overflow-x-auto bg-[#004E7E] mt-2">{cronograma3}</div>)
          }
        </div>
        

      </div>
      

    </div>
  )
}