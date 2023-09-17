import { NextResponse } from 'next/server'
import axios from 'axios'
import { macroCanopy } from '../../apis/canopy'

export async function POST(req: Request) {
    const { latitude, longitude } = await req.json();

    const { canopyGridAll, canopySufficient, canopyInsufficientAll } = await macroCanopy(longitude, latitude);

    return canopyInsufficientAll;
}