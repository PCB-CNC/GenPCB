import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState } from 'react'
import { BsJustify, BsPlusCircleFill } from 'react-icons/bs'
import { FcOk, FcExpired, FcDocument } from 'react-icons/fc'

import api from '../services/api'

import { sendFileString, convertToGcode } from '../services/FileRequests'

import {ProgressBar} from './progressBar'
import "../assets/index.css"

import JSZip from 'jszip';

import { Steps } from './steps'
import { TbExchange } from 'react-icons/tb';

export function Home() {
    //Controlar a etapa em que o software está
    const [numberStatus, setNumberStatus] = useState<number>(1); 

    //Controlar o arquivo ZIP
    const [file, setFile] = useState<File>();

    //Controlar a lista de arquivos extraídos da ZIP
    const [filesList, setFilesList] = useState<File[]>([]);

    //Controlar lista de arquivos selecionados
    const [selectedFilesList, setSelectedFilesList] = useState<File[]>([]);

    //Controlar a string do arquivo selecionado
    const [fileContent, setFileContent] = useState('');

    //Controlar a porcentagem de andamento do processo
    const [progress, setProgress] = useState(0);

    //Controlar a porcentagem de andamento do processo
    const [gcode, setGcode] = useState('');

    //Controlar se o processo foi finalizado
    const [fullProgress, setFullProgress] = useState(false);

    //Controlar se há alguma interrupção no processo
    const [warning, setWarning] = useState(false);

    //TESTAR PORCENTAGEM DE PROGRESSO e ALERTA NO PROCESSO
    const warningProcess = false;
    const progressPCB = 34;

    // Função para extrair os arquivos de dentro do arquivo ZIP
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
            setNumberStatus(2)
        }
    }

    // Seleção dos arquivos extraídos da pasta ZIP, adicionando-os à um array de files
    const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {

        if(e.target.checked) {
            const file = filesList.find(f => f.name === e.target.name)
            file && setSelectedFilesList(files => [...files, file]);
            console.log([...selectedFilesList, file])

            console.log('esse e o arquivo')
            console.log(file)

            const formData = new FormData();
            file && formData.append("filename", file);

            formData && convertToGcode(formData)
            const reader = new FileReader();

            file && reader.readAsText(file);
            reader.onloadend = () => {
                // console.log("ESSA É A STRING DO ARQUIVO SELECIONADO")
                // const fileContentString = reader.result?.toString()
                // fileContentString && setFileContent(fileContentString)
                // console.log(fileContentString)
            }
      } else {
        const newListWithoutItem = selectedFilesList.filter(f => f.name !== e.target.name)
        setSelectedFilesList(newListWithoutItem)
        console.log(newListWithoutItem)
      }
    }

    const getGcodeString = () => {

        // Função para salvar a string do GCODE no state FileContent, para ser enviado na requisição
        function lerArquivo(path: string) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", path, false);
            xhr.send();
            return xhr.responseText;
        }
        

        const stringGCODE = lerArquivo("/backend/string_gcode.txt");
        setFileContent(stringGCODE);
        console.log(stringGCODE)
    }


    // Enviando o conteúdo STRING do arquivo selecionado através da requisição
    const sendFile = async (fileString: string) => {
        const res = await sendFileString(fileString)
        
        if(res.status === 200) {
            console.log("------------- STRING ENVIADA! -------------")
            console.log(res.data)
        } else {
            console.log("------------- OCORREU UM ERRO! -------------")
            console.log(res.status)
        }
    }

    function getStringAndSend() {
        getGcodeString()
        handlePostRequisition()
    }

    // Função para chamar a requisição de envio da string
    async function handlePostRequisition() {
        sendFile(fileContent)
        setNumberStatus(5)
    }
    
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        hiddenFileInput.current?.click()
    }

    const instructionConvert = () => {
        setNumberStatus(-1)
    }

    //Função para passar os STEPS manualmente
    const handleNextStep = () => {
        if(numberStatus==1) {
            setNumberStatus(2)
        }
        if(numberStatus==2) {
            setNumberStatus(4)
        }
        if(numberStatus==3) {
            setNumberStatus(4)
        }
        if(numberStatus==4) {
            setNumberStatus(5)
        }          
        if(numberStatus==-1) {
            setNumberStatus(1)
        }   
    }

    const handlePreviousStep = () => {
        if(numberStatus==2) {
            setNumberStatus(1)
        }
        if(numberStatus==3) {
            setNumberStatus(2)
        }
        if(numberStatus==4) {
            setNumberStatus(2)
            setSelectedFilesList([])
        }
        if(numberStatus==5) {
            setNumberStatus(4)
        }  
    }

    // Já na página de Feedback, o usuário poderá enviar mais arquivos para contribuir no processo
    const handleSendMore = () => {
        setNumberStatus(2)
        setSelectedFilesList([])
        setFileContent('')
    }

    // Após finalização de alguma marcação, o usuário poderá voltar para selecionar/enviar mais arquivos para marcação
    const handleSelectNewFiles = () => {
        setNumberStatus(2)
        setSelectedFilesList([])
    }

    // Função para finalizar processo
    const handleFinishProcess = () => {
        setNumberStatus(1)
        window.location.reload();
    }

    // -------------------------------------- FEEDBACK ------------------------------------------------- //
    
    //Função para ler a porcentagem de progresso da marcação da PCB
    useEffect(() => {
        async function getFeedback() {
            const response = await api.get('/feedback');

            setProgress(response.data.percentage)
        }

        FullProgress();
        WarningProcess();
        getFeedback();

        // setProgress(progressPCB)
    },[]);

    
    // Função para verificar finalização do processo
    function WarningProcess() {
        warningProcess ? setWarning(true) :  setWarning(false);
    }

    // Função para verificar finalização do processo
    function FullProgress() {
        const complete = 100;
        progress == complete ? setFullProgress(true) : setFullProgress(false);

    }

    return (
        <>
        <div className='container-steps'>
            <Steps completedStep={numberStatus} />
        </div>

            <div className='container' >
                <div className='content'>
                {numberStatus === -1 && <>
                        <p style= {{ color: '#31727a', fontWeight: 'bold', fontSize: '20px', marginTop: '50px',  marginBottom: '20px' }}>
                            Passo 1:
                        </p>
                        <div>
                            <p style= {{ backgroundColor: '#FFF', padding: '20px', borderRadius: '20px', fontFamily: 'Helvetica, sans-serif', color: '#31727a', fontWeight: 'bold', fontSize: '20px',   marginBottom: '40px' }}>
                            Tendo já baixado o repositório LOCAL_BASH_CONVERTER, acesse-o e coloque os arquivos .GERBER dentro da pasta chamada GERBER
                                <br></br><br></br>
                                Os arquivos deverão seguir o padrão de nomenclatura seguinte:
                                <br></br><br></br>
                                Gerber_TopLayer.GTL<br></br>
                                Gerber_BottomLayer.GBL<br></br>
                                Gerber_BoardOutlineLayer.GKO<br></br>
                            </p>
                        </div>
                        <p style= {{ color: '#31727a', fontWeight: 'bold', fontSize: '20px', marginTop: '50px',  marginBottom: '20px' }}>
                            Passo 2:
                        </p>
                        <div>
                            <p style= {{ backgroundColor: '#FFF', padding: '20px', borderRadius: '20px', fontFamily: 'Helvetica, sans-serif', color: '#31727a', fontWeight: 'bold', fontSize: '20px',   marginBottom: '40px' }}>
                            Com os arquivos seguindo a nomenclatura correta e estando dentro da pasta, rode o seguinte comando para liberar a permissão de execução do arquivo de conversão:
                                <br></br><br></br>
                            <div style= {{ marginLeft: '23%', width: '50%', backgroundColor: '#ddd', padding: '10px', borderRadius: '10px', fontFamily: 'Helvetica, sans-serif', color: '#31727a', fontWeight: 'bold', fontSize: '20px'}}>
                                 chmod +x convert.sh
                            </div>
                            </p>
                        </div>
                        <p style= {{ color: '#31727a', fontWeight: 'bold', fontSize: '20px', marginTop: '50px',  marginBottom: '20px' }}>
                            Passo 3:
                        </p>
                        <div>
                            <p style= {{ backgroundColor: '#FFF', padding: '20px', borderRadius: '20px', fontFamily: 'Helvetica, sans-serif', color: '#31727a', fontWeight: 'bold', fontSize: '20px',   marginBottom: '40px' }}>
                            Execute o script CONVERT através do seguinte comando:
                                <br></br><br></br>
                            <div style= {{ marginLeft: '23%', width: '50%', backgroundColor: '#ddd', padding: '10px', borderRadius: '10px', fontFamily: 'Helvetica, sans-serif', color: '#31727a', fontWeight: 'bold', fontSize: '20px'}}>
                                ./convert.sh
                            </div>
                            </p>
                        </div>
                        <p style= {{ color: '#31727a', fontWeight: 'bold', fontSize: '20px', marginTop: '50px',  marginBottom: '20px' }}>
                            Passo Final:
                        </p>
                        <div>
                            <p style= {{ backgroundColor: '#FFF', padding: '20px', borderRadius: '20px', fontFamily: 'Helvetica, sans-serif', color: '#31727a', fontWeight: 'bold', fontSize: '20px',   marginBottom: '40px' }}>
                            Após a execução do script, os arquivos GCODE serão gerados na pasta GCODE, com os nomes abaixo:
                                <br></br><br></br>
                                Top.gcode<br></br>
                                Bottom.gcode<br></br>
                                Outline.gcode<br></br>
                                <br></br>
                                <br></br>
                           Será gerado um arquivo chamado gcode.ZIP. Esse será o arquivo para você enviar na próxima etapa!
                            </p>
                        </div>
                            <button className="btn" onClick={handleNextStep}>Já fiz isso!</button>
                    </>}
                    {numberStatus === 1 && <>
                        <p style= {{ color: '#fff', fontWeight: 'bold', fontSize: '20px', marginTop: '100px',  marginBottom: '40px' }}>
                            { !file && 'Selecione no seu computador o arquivo ZIP com os etapas necessárias para marcação '}
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
                        <div style= {{ color: '#fff', fontWeight: 'bold', fontSize: '20px', marginTop: '100px',  marginLeft: '10px' }}>
                            <button className='btn' onClick={instructionConvert}>
                                <div>
                                    <span> Como converter? </span>
                                </div>
                            </button>
                        </div>
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
                                            <span> Selecionar </span> 
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="btn" onClick={handleFinishProcess}>Trocar arquivo ZIP</button>
                        {/* <button className="btn" onClick={handleNextStep}>Proxima Página</button> */}
                    </>}

                    {numberStatus === 3 && <>
                        <span>CONVERTER ARQUIVOS</span>
                    </>}

                    {numberStatus === 4 && <>
                        <p style={{color: '#fff', fontWeight: 'bold', fontSize: '25px'}}>Lista de arquivos a serem enviados:</p>
                        {selectedFilesList.map(files =>
                          <p style={{color: '#2B676F', fontWeight: 'bold', fontSize: '25px'}} key={files.name}>{files.name}</p>
                        )}
                            {/* <button className="btn" onClick={handlePreviousStep}>Selecionar mais arquivos</button> */}
                            <button className="btn" onClick={getStringAndSend}>Exportar</button>
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
                            <>
                                <button style={{ backgroundColor: 'green' }} className="btn" onClick={handleSelectNewFiles}>Enviar outro arquivo</button>
                                <button style={{ backgroundColor: 'green' }} className="btn" onClick={handleFinishProcess}>Finalizar Processo</button> 
                            </>
                            :
                            <>
                                <button className="btn" onClick={handleSendMore}>Selecionar mais arquivos</button>
                            </>
                        }
                    </>}
                </div>
            </div>
        </>
    );
}