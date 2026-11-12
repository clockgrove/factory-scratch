import { createGateway, generateText } from 'ai';

/** Prints one line on stderr and sets a non-zero exit code. */
function fail(message) {
  console.error(message.replace(/\s*\n\s*/g, ' '));
  process.exitCode = 1;
}

const missing = ['AI_GATEWAY_API_KEY', 'FACTORY_GATEWAY_URL'].filter(
  (name) => !process.env[name],
);

if (missing.length > 0) {
  fail(`Missing environment variable: ${missing.join(', ')}`);
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
  } catch (error) {
    const status = error?.statusCode ?? error?.cause?.statusCode;
    const message = String(error?.message ?? error).replaceAll(
      process.env.AI_GATEWAY_API_KEY,
      '[redacted]',
    );
    fail(`AI Gateway call failed: ${message}${status ? ` (HTTP ${status})` : ''}`);
  }
}
