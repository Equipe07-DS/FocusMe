import { useForm } from "react-hook-form";
import './FazerFormulario.css'
import { useNavigate } from "react-router-dom";

const FazerFormulario = () => {
    const { register, handleSubmit, formState: { errors }} = useForm();

    console.log('RENDER');

    const navigate = useNavigate();
    const onSubmit = (data) => {
        navigate('/VerCronograma');
    };

    return (
        <div className="Caixa">
            <div className="dias">
                <div className="Informacoes-dias">
                    <p className="Texto-informacoes">Informe sua disponibilidade de horários para estudo:</p>
                    <p className="Exemplo-dias">Ex:10:45-12:20;15:30-17:00.</p>
                </div>
                <div className="Grid-dias">
                    <div className="Grid-1">
                        <div className="formulario">
                            <label>Segunda</label>
                            <input type="text" placeholder="Digite aqui"  {...register('segunda')}></input>
                        </div>

                        <div className="formulario">
                            <label>Terça</label>
                            <input type="text" placeholder="Digite aqui"  {...register('terca')}></input>
                        </div>

                        <div className="formulario">
                            <label>Quarta</label>
                            <input type="text" placeholder="Digite aqui"  {...register('quarta')}></input>
                        </div>
                    </div>

                    <div className="Grid-2">
                        <div className="formulario">
                            <label>Quinta</label>
                            <input type="text" placeholder="Digite aqui"  {...register('quinta')}></input>
                        </div>

                        <div className="formulario">
                            <label>Sexta</label>
                            <input type="text" placeholder="Digite aqui"  {...register('sexta')}></input>
                        </div>

                        <div className="formulario">
                            <label>Sábado</label>
                            <input type="text" placeholder="Digite aqui"  {...register('sabado')}></input>
                        </div>
                    </div>
                </div>

                <div className="formulario">
                    <label>Domingo</label>
                    <input type="text" placeholder="Digite aqui"  {...register('domingo')}></input>
                </div>

            </div>

            <div className="Outras-Infos">
                <div className="formulario">
                    <label>Disciplinas</label>
                    <input type="text" placeholder="Digite aqui"  {...register('disciplinas', {required: true})}></input>
                </div>

                <div className="formulario">
                    <label>Observações</label>
                    <input type="text" placeholder="Digite aqui"  {...register('observacoes', {required: true})}></input>
                </div>
            </div>
            <div className="Caixa-botao">
                
                    <button className="botao" onClick={() => handleSubmit(onSubmit)()}>Gerar cronograma</button>
                
            </div>
        </div>
        
    )
}

export default FazerFormulario;
