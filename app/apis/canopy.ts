// default export macroCanopy
// takes long, lat (note x is long, y is lat), and a handler that takes in arrays of allGrid, sufficientGrid, insufficientGrid
import Jimp from 'jimp'

const gmap_api = "AIzaSyB5gMGVEdjmsBG9ssXrwHbZsoXWO7mc2A4" // process.env['GOOGLE_MAP_API'];

const gridConstant = 0.00084 // change in long/lat that'll move a x20 grid one block
const gridConstant17x = 0.0033685 // change in long (ik, x is confusing notation here) that'll move a x17 grid one block
const gridConstant17y = 0.0062 // change in lat that'll move a x17 grid one block

const mileLongLat = 0.01667 // a mile in long/lat

const bigGridDimension = 3; // bigGridDimension * 2 by bigGridDimension * 2
const bigToSmall = 8; // ratio of small grid's width to big grid's width

const greenHLower = 75
const greenHHigher = 181
const greenSLower = 5;

const RGBToH = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
      ];
  };


const isGreenZoomedOut = (image: Jimp, i: number, j: number) => {
    
    let p = image.getPixelColor(i, j) >> 8; // returns the colour of that pixel e.g. 0xFFFFFFFF

    // Get RGB
    let b = p % 256
    p /= 256
    p = Math.floor(p)
    let g = p % 256
    p /= 256
    p = Math.floor(p)
    let r= p

    let [h, s, l] = RGBToH(r, g, b)
    // console.log("H: " + h + " S: " + s + "@(" + i + ", " + j + ")")
    // console.log(image.getPixelColor(i * movement, j * movement))
    return (h >= greenHLower && h <= greenHHigher && s > greenSLower)
}

let analyzeSmallGrid = (image: Jimp, small_left: number, small_right: number, small_top: number, small_bottom: number) => {
    let numGreenPixels = 0;
    let dimension = small_right - small_left;
    for (let i = small_left; i < small_right; i++) {
        for (let j = small_top; j < small_bottom; j++) {
            // Uncomment to draw borders
            // if (i == small_left || i == small_right || j == small_top || j == small_bottom) {
            //     image.setPixelColor(65535, i, j);
            // }
            if (isGreenZoomedOut(image, i, j)) {
                image.setPixelColor(4278190335, i, j);
                numGreenPixels++;
            }
        }
    }

    // Uncomment to annotate high canopy areas
    // if (numGreenPixels / (dimension ** 2) > 0.10) {
    //     for (let i = small_left; i < small_right; i++) {
    //         for (let j = small_top; j < small_bottom; j++) {
    //             if (i == small_left || i == small_right || j == small_top || j == small_bottom) {
    //                 image.setPixelColor(16777215, i, j);
    //             }
    //         }
    //     }
    // }
    return numGreenPixels / (dimension ** 2) // density
}

const returnLowCanopySmallGridsAsync = async (x: number, y: number, url: string): Promise<CanopyData> => {
    return new Promise((resolve, reject) => {
      Jimp.read(url, async (err, image) => {
        if (err) {
          reject(err);
          return;
        }
  
        const movement = 640 / 8;
  
        const canopySmallGrids: Array<CanopyObject> = [];
        let canopyMax: CanopyObject = { x: 0, y: 0, x_width: 0, y_width: 0, canopy: -1 };
        const canopyInsufficient: Array<CanopyObject> = [];
  
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            const canopyCoverage = analyzeSmallGrid(
              image,
              i * movement,
              (i + 1) * movement,
              j * movement,
              (j + 1) * movement
            );
  
            const coordinateX = x + (i - 4) * (gridConstant17x / 8);
            const coordinateY = y + (j - 4) * (gridConstant17y / 8);
            const canopyObject = {
              x: coordinateX,
              y: coordinateY,
              x_width: gridConstant17x / 8,
              y_width: gridConstant17y / 8,
              canopy: canopyCoverage,
            };
  
            canopySmallGrids.push(canopyObject);
  
            if (canopyCoverage > canopyMax['canopy']) {
              canopyMax = canopyObject;
            }
            if (canopyCoverage < 0.014) {
              canopyInsufficient.push(canopyObject);
            }
          }
        }
  
        // You can remove the image.write line as it's commented out
        // image.write("./sbd/" + x + "," + y + ".png");
  
        resolve({
          all: canopySmallGrids,
          limit: canopyMax,
          insufficient: canopyInsufficient,
        });
      });
    });
  };

export const macroCanopy = async (centerX: number, centerY: number, limitCount: number) => {
    let canopyGridAll: Array<CanopyObject> = []
    let canopySufficient: Array<CanopyObject> = []
    let canopyInsufficientAll: Array<CanopyObject> = []
    let ijSum = 0
    for (let i = -bigGridDimension; i <= bigGridDimension; i++) {
        for (let j = -bigGridDimension; j <= bigGridDimension; j++) {
            
            let newX = centerX + i * gridConstant17x
            let newY = centerY + j * gridConstant17x
            let url = "https://maps.googleapis.com/maps/api/staticmap?center=" + newX + "," + newY + "&zoom=17&size=640x640&maptype=satellite&key=" + gmap_api
            console.log(`Trying URL: ${url}`)
            let { all, limit, insufficient } = await returnLowCanopySmallGridsAsync(newX, newY, url);
            
            ijSum++
            canopyGridAll = [...canopyGridAll, ...all]
            // console.log("Grid")
            // console.log(canopyGrid)
            if (limit["canopy"] > 0.14) {
                canopySufficient.push(limit)
            }
            canopyInsufficientAll = [...canopyInsufficientAll, ...insufficient]
            if (canopyInsufficientAll.length > limitCount) {
                return { canopyGridAll, canopySufficient, canopyInsufficientAll };
                // console.log("Canopy Grid All")
                // console.log(canopyGridAll)
                // console.log("Canopy Sufficient")
                // console.log(canopySufficient)
                // console.log("Canopy Insufficient")
                // console.log(canopyInsufficient)

                /* == Uncomment to write files ==
                let all = {"grids": canopyGridAll}
                let suf = {"grids": canopySufficient}
                let ins = {"grids": canopyInsufficientAll}
                var allJSON = JSON.stringify(all);
                var sufJSON = JSON.stringify(suf);
                var insJSON = JSON.stringify(ins);
                var fs = require('fs');
                fs.writeFile('city.json', allJSON, 'utf8', () => {
                    console.log("Done city")
                });

                fs.writeFile('sufficient.json', sufJSON, 'utf8', () => {
                    console.log("Done suf")
                });

                fs.writeFile('insufficient.json', insJSON, 'utf8', () => {
                    console.log("Done ins")
                });
                */
            }
        }
    }

    // console.log("returning")
    // console.log(canopyGridAll.length)
    // console.log(canopySufficient.length)
    // console.log(canopyInsufficientAll.length)

    return { canopyGridAll, canopySufficient, canopyInsufficientAll };
}
