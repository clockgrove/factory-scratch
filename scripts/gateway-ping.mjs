import { createGateway, generateText } from 'ai';

const missing = ['AI_GATEWAY_API_KEY', 'FACTORY_GATEWAY_URL'].filter(
  (name) => !process.env[name],
);

if (missing.length > 0) {
  console.error(`Missing required environment variable: ${missing.join(', ')}`);
  process.exitCode = 1;
} else {
  try {
    const gateway = createGateway({
      apiKey: process.env.AI_GATEWAY_API_KEY,
      baseURL: `${process.env.FACTORY_GATEWAY_URL.replace(/\/$/, '')}/v4/ai`,
    });
    const result = await generateText({
      model: gateway('nvidia/nemotron-3.5-lightning-free'),
      prompt: 'Say ok.',
    });
    console.log(`text: ${result.text}`);
    console.log(`cost: ${result.providerMetadata.gateway.cost}`);
  } catch {
    console.error('AI Gateway call failed.');
    process.exitCode = 1;
  }
}
