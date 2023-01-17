import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { BsJustify, BsPlusCircleFill } from 'react-icons/bs'

import "../assets/index.css"

import { Steps } from './steps'

export function Home() {
    const [numberStatus, setNumberStatus] = useState<number>(1); 
    const [file, setFile] = useState<File>()

    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        hiddenFileInput.current?.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(files && files.length) {
            setFile(files[0]);
            setNumberStatus(2)
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
                    </>}


                    {numberStatus === 2 && <>
                        <span>selecionar aquivos</span>
                    </>}

                    {numberStatus === 3 && <>
                        <span>converter arquivos</span>
                    </>}

                    {numberStatus === 4 && <>
                        <span>exportar aquivos</span>
                    </>}

                    {numberStatus === 5 && <>
                        <span>acompanhar desenvolvimento</span>
                    </>}
                </div>
            </div>
        </>
    );
}