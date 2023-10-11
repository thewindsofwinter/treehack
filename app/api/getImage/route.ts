import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
    const { id, datauri } = await req.json();
    // console.log(datauri);

    const value = await axios.post("http://127.0.0.1:5000/api/edit-image", {
        id,
        datauri,
    }).then((response) => {
        return { ...response.data }
    })

    return NextResponse.json(value);
}