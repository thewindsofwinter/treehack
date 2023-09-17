import OpenAI from "openai";

const OPENAI_API_KEY = process.env["OPENAI_API_KEY"]
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

export async function POST(req: Request) {
    const { coordinateX, coordinateY } = await req.json();

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: "Generate a concise list of native tree species that can provide shading for urban environments with low maintenance costs and compatibility to survive in the given coordinates (" + coordinateX + "," + coordinateY + "). Respond in the format: 1. Tree name - description. 2. Tree name - description..." }],
        model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message.content;
}