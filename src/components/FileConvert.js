import {read, plot, renderLayers, renderBoard} from '@tracespace/core'
import {toHtml} from 'hast-util-to-html'
// import sharp from 'sharp';


const convertToPng = async (file) => {
    const files = [file]
    const readResult = await read(files)
    const plotResult = plot(readResult)
    const renderLayersResult = renderLayers(plotResult)
    const rendersById = renderLayersResult.rendersById;
    const elements = Object.values(rendersById);
    // array of elements
    for (const element of elements) {
    //change currentColor to white
        element.properties.style = "fill: black; stroke: white; stroke-width: 0.0mm; fill-opacity: 1"
        element.children.map((child,index)=>{
            if(child.tagName==="rect" || child.tagName==="circle"){
            child.properties.fill="white";
            }
            if(index==0){
            child.properties.fill="white";
            }
        });
    }

    let svg;
    let fl;
    await Promise.all([
    // fs.writeFile('test.svg', toHtml(renderLayersResult.rendersById[0])),
    // test first element of array
        svg=toHtml(elements[0]),

        console.log(svg)
        // fl = await sharp(Buffer.from(svg), { density: 100 }).png()

    ]) 
    console.log(fl)
}

export { convertToPng }