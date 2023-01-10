import { ChangeEvent, useRef, useState } from 'react'
import { BsPlusCircleFill } from 'react-icons/bs'

import "../assets/index.css"

export function Home() {
    const [loadFile, setLoadFile] = useState<File>(); 
    const hiddenFileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        hiddenFileInput.current?.click();
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(files && files.length) {
            setLoadFile(files[0]);
        }
    }
        
    return (
        <div className='container' >
            <div className='content'>
                <p>
                    { !loadFile && 'Arraste e solte o arquivo aqui ou escolha o arquivo no seu computador'}
                    { loadFile && loadFile.name }
                </p>
                <button className='loadFileButton' onClick={handleClick}>
                    <div>
                        <BsPlusCircleFill size={20}/>
                        <span> Escolher arquivo</span>
                    </div>
                </button>
                <input ref={hiddenFileInput} type="file" hidden onChange={handleFileChange} />
            </div>
        </div>
    );
}