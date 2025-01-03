import OpenAI from 'openai';

const client = new OpenAI({
    apiKey: 'fk202233-4iuohmeNYqwl6doCXmPmUyn0gooDZ9GH',
    baseURL: 'https://oa.api2d.net'
});

async function main() {
  const stream = await client.chat.completions.create({
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: 'user', content: '今天是星期几，天气怎么样' },
    ],
    stream: true
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();
