import {read, plot, renderLayers} from '@tracespace/core'
import { toHtml } from 'hast-util-to-html'
import sharp from 'sharp'

import img2gcode from "img2gcode";
import ProgressBar from "progress";

var bar = new ProgressBar("Analyze: [:bar] :percent :etas", { total: 100 });

import fs from 'fs'

const gerberFileString = () => {
  fs.readFile('output.gcode', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data)
  });
}

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
    element.children.map((child,index) => {
      if(child.tagName==="rect" || child.tagName==="circle"){
        child.properties.fill="white";
      }
      if(index==0){
        child.properties.fill="white";
      }
    });
  }

  let svg;
  await Promise.all([
    svg=toHtml(elements[0]),
    await sharp(Buffer.from(svg), { density: 100 }).png().toFile("output.png")
    .catch((error) => {
      console.log('------------ Ocorreu algum erro na conversão... ------------')
      console.error(error);
    })
  ]) 
}

const convertToGcode = () => {
  img2gcode
  .start({
    // It is mm
    toolDiameter: 0.01,
    deepStep: -1,
    whiteZ: 20,
    blackZ: -2,
    safeZ: 20,    
    feedrate: { work: 40, idle: 300 },
    info: "emitter",
    dirImg: 'output.png'
  })
  .on("log", (str) => {
    console.log(str);
  })
  .on("tick", (perc) => {
    bar.update(perc);
  })
  .then((data) => {
    console.log(data.config);
    console.log(data.dirgcode);
    // gerberFileString()
  });  
}

export { convertToPng, convertToGcode }