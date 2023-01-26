import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BsJustify, BsPlusCircleFill } from 'react-icons/bs'
import { FcOk, FcExpired } from 'react-icons/fc'

import "../assets/index.css"

import { Steps } from './steps'
import { ProgressBar } from './progressBar'

export function Home() {
    const [numberStatus, setNumberStatus] = useState<number>(1); 
    const [file, setFile] = useState<File>();

    //Controlar a porcentagem de andamento do processo
    const [progress, setProgress] = useState(0);

    //Controlar se o processo foi finalizado
    const [fullProgress, setFullProgress] = useState(false);

    //Controlar se há alguma interrupção no processo
    const [warning, setWarning] = useState(true);

    //TESTAR PORCENTAGEM DE PROGRESSO e ALERTA NO PROCESSO
    const warningProcess = false;
    const progressPCB = 90;

    // Função para ler a porcentagem de progresso da marcação da PCB
    // NECESSÁRIO ATUALIZAR RECEBENDO O VALOR DO SISTEMA EMBARCADO
    useEffect(() => {
        FullProgress();
        WarningProcess();
        const id = setProgress(progressPCB)
    },[]);

    // Função para verificar finalização do processo
    function WarningProcess() {
        if (warningProcess) {
            setWarning(true);
        }
        else {
            setWarning(false);
        }
    }

    // Função para verificar finalização do processo
    function FullProgress() {
        if (progressPCB==100) {
            setFullProgress(true);
        }
        else {
            setFullProgress(false);
        }
    }

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        hiddenFileInput.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(files && files.length) {
            setFile(files[0]);
            setNumberStatus(5)
        }
    }

    const handleFinishProcess = () => {
        setNumberStatus(1)
        window.location.reload(false);
    }

    //Função para passar os STEPS manualmente
    const handleNextStep = () => {
        if(numberStatus==1) {
            setNumberStatus(2)
            console.log(numberStatus)
        }
        if(numberStatus==2) {
            setNumberStatus(3)
            console.log(numberStatus)
        }
        if(numberStatus==3) {
            setNumberStatus(4)
            console.log(numberStatus)
        }
        if(numberStatus==4) {
            setNumberStatus(5)
            console.log(numberStatus)
        }    
    }

    return (
        <>
        <div className='container-steps'>
            <Steps completedStep={numberStatus} />
        </div>

            <div className='container' >
                <div className='content'>
                    {numberStatus === 1 && <>
                        <p>
                            { !file && 'Arraste e solte o arquivo aqui ou escolha o arquivo no seu computador'}
                            { file && file.name }
                        </p>
                        <button className='load-file-button' onClick={handleClick}>
                            <div>
                                <BsPlusCircleFill size={20}/>
                                <span> Escolher arquivo </span>
                            </div>
                        </button>
                        <input ref={hiddenFileInput} type="file" hidden accept='.zip' onChange={handleFileChange} />
                        <button className="btn" onClick={handleNextStep}>Proxima Página</button>
                    </>}


                    {numberStatus === 2 && <>
                        <span>selecionar aquivos</span>
                        <button className="btn" onClick={handleNextStep}>Proxima Página</button>
                    </>}

                    {numberStatus === 3 && <>
                        <span>converter arquivos</span>
                        <button className="btn" onClick={handleNextStep}>Proxima Página</button>
                    </>}

                    {numberStatus === 4 && <>
                        <span>exportar aquivos</span>
                        <button className="btn" onClick={handleNextStep}>Proxima Página</button>
                    </>}

                    {numberStatus === 5 && <>
                        { warning ?
                            <div>
                                <FcExpired size={150}/>
                                <div className='progressTitle'>
                                    <p style= {{ color: 'yellow', marginTop: '2%', fontSize: '30px' }}>HOUVE ALGUMA INTERRUPÇÃO NO PROCESSO</p>
                                </div>
                            </div>
                        :  
                            <div>
                                {fullProgress ?
                                    <div>
                                        <FcOk size={120}/>
                                        <div className='progressTitle'>
                                            <p style= {{ color: fullProgress ? '#408540' : '#2B676F', marginTop: '2%' }}>PROGRESSO CONCLUÍDO</p>
                                        </div>
                                    </div>
                                :
                                    <div className='progressTitle'>
                                        <p id="textRunningProcess">MARCANDO PLACA...</p>
                                    </div>
                                }
                            </div>
                        }
                        <ProgressBar value={progress}></ProgressBar>
                        {fullProgress ?
                            <button style={{ backgroundColor: 'green' }}className="btn" onClick={handleFinishProcess}>Finalizar Processo</button> 
                            :
                            <></>
                        }
                    </>}
                </div>
            </div>
        </>
    );
}