import React, { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'

import "../assets/progressbar.css"

export function ProgressBar({value}: any) {
    
    const [progressText, setprogressText] = useState(0); 

    useEffect(() => {
        if (progressText != null) {
            animate(progressText,value, {
                duration: 2,
                onUpdate: (cv) => {
                    setprogressText(cv.toFixed(0))
                }
            })
        }
    }, [value])

    return (
        <div className='progressContentAll'>
            <div className="progressbar-container">
                <div className='progressbar'>
                    <motion.div 
                        className='bar'
                        animate={{
                            width: `${value}%`
                        }}
                        transition={{
                            duration: 2
                        }}
                        />
                </div>
                <div className="progressbar-text-container">
                        <p>{progressText}</p>
                        <p>%</p>
                </div>
            </div>  
        </div>
    );
}

