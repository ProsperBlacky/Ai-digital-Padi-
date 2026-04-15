import OpenAI from "openai";

export async function POST(req) {
  try {
    const body = await req.json();
    const answers = body.answers;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are "PADI Agent", a career intelligence AI.

Analyze the user's answers and return STRICT JSON only:

{
  "personality": "",
  "bestSkill": "",
  "reason": "",
  "roadmap": ["step 1", "step 2", "step 3"],
  "incomePath": ""
}

USER ANSWERS:
${JSON.stringify(answers)}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a strict JSON generator." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const text = response.choices[0].message.content;

    return Response.json(JSON.parse(text));
  } catch (error) {
    return Response.json(
      { error: "AI analysis failed", details: error.message },
      { status: 500 }
    );
  }
}