import React, { useEffect, useRef, useState } from 'react'
import { motion, animate } from 'framer-motion'

import "../assets/progressbar.css"

export function ProgressBar({value}) {
    
    const progressTextRef = useRef(null);

    useEffect(() => {
        const progressText = progressTextRef.current?.textContent;
        if (progressText != null) {
            animate(parseInt(progressText),value, {
                duration: 2,
                onUpdate: (cv) => {
                    progressTextRef.current.textContent = cv.toFixed(0)
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
                        <p ref={progressTextRef}>0</p>
                        <p>%</p>
                </div>
            </div>  
        </div>
    );
}