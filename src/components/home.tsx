import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from 'react'
import { BsJustify, BsPlusCircleFill } from 'react-icons/bs'
import { FcOk, FcExpired, FcDocument } from 'react-icons/fc'

import "../assets/index.css"

import JSZip from 'jszip';

import { Steps } from './steps'
import { ProgressBar } from './progressBar'
import { TbExchange } from 'react-icons/tb';

export function Home() {
    const [numberStatus, setNumberStatus] = useState<number>(1); 

    const [file, setFile] = useState<File>();

    const [filesList, setFilesList] = useState<File[]>([]);

    const [selectedFilesList, setSelectedFilesList] = useState<File[]>([]);
    
    // const [imageTest, setImageTest] = useState<any>(); 

    const extractFile = (file: File) => {
        JSZip.loadAsync(file).then(zip => {
            Object.keys(zip.files).forEach(filename => {
                // const isGerberFile = filename.includes('.gbr')
                // if(isGerberFile) {
                    zip.files[filename].async('blob').then(fileData => {
                        const file = new File([fileData], filename)
                        setFilesList(files => [...files, file]);
                    })
                // }
            })
        })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(files && files.length) {
            setFile(files[0]);
            extractFile(files[0])
            // setimageTest(files)
            setNumberStatus(2)
        }
    }

    const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
      if(e.target.checked) {
        const file = filesList.find(f => f.name === e.target.name)
        file && setSelectedFilesList(files => [...files, file]);
        console.log([...selectedFilesList, file])
      } else {
        const newListWithoutItem = selectedFilesList.filter(f => f.name !== e.target.name)
        setSelectedFilesList(newListWithoutItem)
        console.log(newListWithoutItem)

      }
    }
    
    const handleFinishProcess = () => {
        setNumberStatus(1)
        window.location.reload(false);
    }
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
                        {/* <button className="btn" onClick={handleNextStep}>Proxima Página</button> */}
                    </>}


                    {numberStatus === 2 && <>
                        <div className='container-files'>
                            <div>
                                <div className='container-files-select'>
                                    {filesList.map(file =>
                                        <label key={file.name} className="form-control">
                                            <input type="checkbox" onChange={handleChangeChecked} name={file.name} />
                                            <span className='label'>
                                                <FcDocument size={20}/>
                                                {file.name}
                                            </span>
                                        </label>
                                    )}
                                </div>

                                <div style={{width: '100%', display: 'flex', justifyContent:'flex-end'}}>
                                    <button className="btn-select-files" onClick={handleNextStep}>
                                        <div>
                                            <TbExchange size={20}/>
                                            <span> Converter arquivos </span> 
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* <button className="btn" onClick={handleNextStep}>Proxima Página</button> */}
                    </>}

                    {numberStatus === 3 && <>
                        <div>Lista de arquivos a serem convertidos:</div>
                        {selectedFilesList.map(files =>
                          <div style={{color: '#fff'}} key={files.name}>{files.name}</div>
                        )}
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
                                    <p style= {{ color: 'yellow', marginTop: '2%', fontSize: '30px' }}>
                                        HOUVE ALGUMA INTERRUPÇÃO NO PROCESSO
                                    </p>
                                </div>
                            </div>
                        :  
                            <div>
                                {fullProgress ?
                                    <div>
                                        <FcOk size={120}/>
                                        <div className='progressTitle'>
                                            <p style= {{ color: fullProgress ? '#408540' : '#2B676F', marginTop: '2%' }}>
                                                PROGRESSO CONCLUÍDO
                                            </p>
                                        </div>
                                    </div>
                                :
                                    <div className='progressTitle'>
                                        <p id="textRunningProcess">
                                            MARCANDO PLACA...
                                        </p>
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