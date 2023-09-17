const OpenAI = require("openai")

const OPENAI_API_KEY = "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" // process.env["OPENAI_API_KEY"]


const openai = new OpenAI({
  apiKey: OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

async function main(coordinateX, coordinateY, handler) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: "Generate a concise list of native tree species that can provide shading for urban environments with low maintenance costs and compatibility to survive in the given coordinates (" + coordinateX + "," + coordinateY + "). Respond in the format: 1. Tree name - description. 2. Tree name - description..." }],
    model: 'gpt-3.5-turbo',
  });

  handler(completion.choices[0].message.content);
}

module.export = { main }