import { FaFolderOpen} from 'react-icons/fa';
import { TbCheckbox, TbExchange } from 'react-icons/tb';
import { TiExport } from 'react-icons/ti';
import { AiOutlineMonitor } from 'react-icons/ai';

import { Step, StepLine } from './steps.styles';
import "../assets/index.css"

interface StepsProps {
  completedStep: number
}

let steps = [
  { number: 1, icon: <FaFolderOpen size={20}/>, complete: false, label: 'Carregar Arquivo'},
  { number: 2, icon: <TbCheckbox size={24}/>, complete: false, label: 'Selecionar Arquivos'},
  { number: 3, icon: <TbExchange size={24}/>, complete: false, label: 'Converter Arquivos'},
  { number: 4, icon: <TiExport size={24}/>, complete: false, label: 'Exportar Arquivos'},
  { number: 5, icon: <AiOutlineMonitor size={24}/>, complete: false, label: 'Acompanhar Desenvovimento'}
]

const Steps = ({completedStep}: StepsProps) => {

  steps.forEach(stp => {
    if(stp.number <= completedStep) {
      stp.complete = true
    } else {
      stp.complete = false
    }
  });

  return (
    <>
      {steps.map(step => (
          <div key={step.number}>
            <div className='div-steps'>
              <StepLine complete={step.complete}></StepLine>
              <Step complete={step.complete}> {step.icon} </Step>
              <StepLine complete={step.complete}></StepLine>
            </div>

            <div className='div-steps'>
              <div className='div-steps-label'>
               <span >{step.label} </span>
              </div>
            </div>
          </div>   
      ))}
    </>
  );
}

export { Steps }
