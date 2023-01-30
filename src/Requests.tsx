function postData() {
    fetch('//endpoint do embarcado', {
        method: 'POST',
        body: JSON.stringify({
            //Parametros do codigo para a CNC
        })
    })      
}

export {};