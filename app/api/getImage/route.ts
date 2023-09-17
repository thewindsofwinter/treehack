import axios from 'axios';
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import openai from 'openai';
import { Blob } from "buffer";

// Replace 'YOUR_API_KEY' with your actual OpenAI API key
const apiKey = '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';

const client = new openai({ apiKey });


export async function POST(req: Request) {
    const { imageDataURI } = await req.json();

    // Convert the base64 data URI to a binary buffer
    const imageBuffer = Buffer.from(imageDataURI.split(',')[1], 'base64');
    const file: any = imageBuffer;

    file.name = "image.png";
    
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'img');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/mask2.png');
    const mask: any = fileContents;

    mask.name = "mask2.png";

    console.log(imageBuffer.length)
    console.log(mask.length)
    const uint8Array = new Uint8Array(imageBuffer);
    const maskArray = new Uint8Array(mask);
    
    // Call the OpenAI API to generate the edited image
    const response = await client.images.edit({
        image: new File(new Blob([imageBuffer]), 'input.png'),
        mask: new File(new Blob([fileContents]), 'input.png'),
        prompt: "A vibrant urban landscape with many lush green trees gracefully lining both sides of the street.",
        n: 1,
        size: "512x512",
    }).then((response) => { response.data[0].url });

    console.log(response);

    // Send the image URL as a response
    return NextResponse.json({ response });
};
