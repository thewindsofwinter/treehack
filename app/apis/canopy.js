var Jimp = require("jimp");


const gridConstant = 0.00084 // change in long/lat that'll move a x20 grid one block
const gridConstant17x = 0.0033685 // change in long (ik, x is confusing notation here) that'll move a x17 grid one block
const gridConstant17y = 0.0062 // change in lat that'll move a x17 grid one block

const mileLongLat = 0.01667 // a mile in long/lat

const bigGridDimension = 3; // bigGridDimension * 2 by bigGridDimension * 2
const bigToSmall = 8; // ratio of small grid's width to big grid's width

const greenHLower = 75
const greenHHigher = 181
const greenSLower = 5;

const RGBToH = (r, g, b) => {
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


const isGreenZoomedOut = (image, i, j) => {
    
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
    return (h >= greenHLower & h <= greenHHigher & s > greenSLower)
}





let analyzeSmallGrid = (image, small_left, small_right, small_top, small_bottom) => {
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
let returnLowCanopySmallGrids = (x, y, url, handler) => {
    Jimp.read(url, function (err, image) {
        let movement = 640 / 8;

        // Init
        let canopySmallGrids = []
        let canopyMax = {x: 0, y: 0, canopy: -1}
        let canopyInsufficient = []

        // 8 x 8 grid within bigger picture
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let canopyCoverage = analyzeSmallGrid(image, i * movement, (i+1) * movement, j * movement, (j+1) * movement)
                let coordinateX = x + (i - 4) * (gridConstant17x / 8);
                let coordinateY = y + (j - 4) * (gridConstant17y / 8);
                let canopyObject = {x: coordinateX, y: coordinateY, x_width: gridConstant17x / 8, y_width: gridConstant17y / 8, canopy: canopyCoverage}
                canopySmallGrids.push(canopyObject)
                
                if (canopyCoverage > canopyMax["canopy"]) {
                    canopyMax = canopyObject
                }
                if (canopyCoverage < 0.014) {
                    canopyInsufficient.push(canopyObject)
                }
            }
        }
        // image.write("./sbd/" + x + "," + y + ".png")
        handler(canopySmallGrids, canopyMax, canopyInsufficient)
    });
}

let macroCanopy = (centerX, centerY, handler) => {
    let canopyGridAll = []
    let canopySufficient = []
    let canopyInsufficientAll = []
    let ijSum = 0
    for (let i = -bigGridDimension; i <= bigGridDimension; i++) {
        for (let j = -bigGridDimension; j <= bigGridDimension; j++) {
            
            let newX = centerX + i * gridConstant17x
            let newY = centerY + j * gridConstant17x
            let url = "https://maps.googleapis.com/maps/api/staticmap?center=" + newX + "," + newY + "&zoom=17&size=640x640&maptype=satellite&key=AIzaSyB5gMGVEdjmsBG9ssXrwHbZsoXWO7mc2A4"
            returnLowCanopySmallGrids(newX, newY, url, (canopyGrid, canopyMax, canopyInsufficient) => {
                ijSum++
                canopyGridAll = [...canopyGridAll, ...canopyGrid]
                // console.log("Grid")
                // console.log(canopyGrid)
                if (canopyMax["canopy"] > 0.14) {
                    canopySufficient.push(canopyMax)
                }
                canopyInsufficientAll = [...canopyInsufficientAll, ...canopyInsufficient]
                if (ijSum == (bigGridDimension * 2 + 1) ** 2) {
                    // console.log("Canopy Grid All")
                    // console.log(canopyGridAll)
                    // console.log("Canopy Sufficient")
                    // console.log(canopySufficient)
                    // console.log("Canopy Insufficient")
                    // console.log(canopyInsufficient)
                    handler(canopyGridAll, canopySufficient, canopyInsufficient)

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
            })
        }
    }
}










// ======== Deprecated ===========


let returnCanopyCoverage = (url, handler) => {
    Jimp.read(url, function (err, image) {
        var greenPixels = 0;
        for (let i = 0; i < 640; i++) {
            for (let j = 0; j < 640; j++) {
                if (isGreen(image, i, j)) {
                    greenPixels++;
                    image.setPixelColor(4278190335, i, j);
                    // console.log("Green pixels: " + greenPixels)
                }
                // 71 to 160
    
            }
        }
        let canopyCoverage = greenPixels / (640 * 640)
        image.write(url + ".png")
        handler(canopyCoverage)
    });
}


const isGreen = (image, i, j) => {
    let p = image.getPixelColor(i, j) >> 8; // returns the colour of that pixel e.g. 0xFFFFFFFF
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
    return (h >= 75 & h <= 160 & s > 5)
}

let findCanopyLack17x = (centerX, centerY) => {
    let canopyLackCoordinates = []
    let done = 0
    const grid = 2;
    for (let i = -grid; i < grid; i++) {
        for (let j = -grid; j < grid; j++) {
            let newX = centerX + i * gridConstant
            let newY = centerY + j * gridConstant
            let url = "https://maps.googleapis.com/maps/api/staticmap?center=" + newX + "," + newY + "&zoom=20&size=640x640&maptype=satellite&key=AIzaSyB5gMGVEdjmsBG9ssXrwHbZsoXWO7mc2A4"
            returnCanopyCoverage(url, (greenPercentage) => {
                done++
                console.log("Done " + done)
                if (greenPercentage > 0.014) {
                    console.log(greenPercentage + ": " + url)
                } else {
                    canopyLackCoordinates.push({x: newX, y: newY, pct: greenPercentage, url: url})
                }
                if (done == (grid * 2) ** 2) {
                    console.log(canopyLackCoordinates)
                }
            })
        }
    }
    

}



let center = [34.111256, -117.292732]
