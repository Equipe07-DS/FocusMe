import { useState } from "react";
import Barra from "../Barra/Barra"
import style from "./TelaPerfil.module.css";


export default function CompTelaPerfil({
  nome = "Ana Rodrigues", 
  foto = "/avatar1.png", 
  cronograma1 = "aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaav aaaaa aaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaa aaaaaaaaa aaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
  cronograma2 = "desenvolvimento de software", 
  cronograma3 = "programação"}

) {


  

  const [aberto1, setAberto1] = useState(false);
  const [aberto2, setAberto2] = useState(false);
  const [aberto3, setAberto3] = useState(false);



  return(
    // Div geral
    <div className="bg-[#72ACD2] max-w-screen h-screen flex flex-col items-center overflow-x-hidden">
      
      <Barra/>

      {/* Card do perfil */}
      <div className={style.Quadro}>
        

        {/* Parte de cima do card, com o título "Perfil" e a foto do usuário */}
        <div className="flex w-full flex-col items-center mb-10 pb-5">
          
          {/* Título perfil */}
          <div className="bg-[#004E7E] w-full py-2 flex justify-center rounded-b-2xl rounded-t-2xl mb-6">
            <h1 className="text-white font-bold text-3xl align-top h-10">Perfil</h1>
          </div>

          <img className="w-28 h-28 rounded-full border-[#004E7E] border-4" src={foto}/>
          <h1 className="text-[#004E7E] text-3xl font-bold align-top">{nome}</h1>

        </div>

        <h1 className="text-[#004E7E] text-xl font-bold align-top mx-5 mb-5">Seus cronogramas mais recentes</h1>
        
        {/* Visualizar cronogramas */}

        <div className="bg-[#F6EDE8] rounded-xl p-5 w-9/12 max-h-64 overflow-y-auto items-center justify-center">
          {/* Cronograma 1 */}
          <div className="w-full max-h-96 overflow-y-auto  bg-[#004E7E] hover:cursor-pointer hover:opacity-90 rounded-lg px-4 py-3 mb-5" onClick={() => setAberto1(!aberto1)}>
            <p className="text-white font-bold text-lg">Cronograma 1</p>
            {aberto1 && (
              <div className="text-white break-words overflow-x-auto bg-[#004E7E] mt-2">{cronograma1}</div>)
            }
          </div>

          {/* Cronograma 2 */}
          <div className="w-full max-h-96 overflow-y-auto  bg-[#004E7E] hover:cursor-pointer hover:opacity-90 rounded-lg px-4 py-3 mb-5" onClick={() => setAberto2(!aberto2)}>
            <p className="text-white font-bold text-lg">Cronograma 2</p>
            {aberto2 && (
              <div className="text-white break-words overflow-x-auto bg-[#004E7E] mt-2">{cronograma2}</div>)
            }
          </div>


          {/* Cronograma 3 */}
          <div className="w-full max-h-96 overflow-y-auto  bg-[#004E7E] hover:cursor-pointer hover:opacity-90 rounded-lg px-4 py-3 mb-5" onClick={() => setAberto3(!aberto3)}>
            <p className="text-white font-bold text-lg ">Cronograma 3</p>
            {aberto3 && (
              <div className="text-white break-words overflow-x-auto bg-[#004E7E] mt-2">{cronograma3}</div>)
            }
          </div>
          
        </div>

      </div>
      

    </div>
  )
}