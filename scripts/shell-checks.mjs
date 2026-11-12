const TIMEOUT_MS = 15000;

/** Sends one request and returns the HTTP status code, or 'refused' when it fails before any response. */
async function probe(url, init) {
  try {
    const res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS) });
    await res.arrayBuffer().catch(() => {});
    return String(res.status);
  } catch {
    return 'refused';
  }
}

/** Returns the status line for the AI gateway chat completion check. */
async function gatewayLine() {
  const key = process.env.AI_GATEWAY_API_KEY;
  if (!key) return 'gateway status no-key';
  const result = await probe('https://ai-gateway.vercel.sh/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mistral/mistral-nemo',
      messages: [{ role: 'user', content: 'Say ok' }],
      max_tokens: 5,
    }),
  });
  return `gateway status ${result}`;
}

/** Returns the status line for a plain GET of one host. */
async function hostLine(host, url) {
  const result = await probe(url, { method: 'GET' });
  return result === 'refused' ? `${host} refused` : `${host} status ${result}`;
}

/** Returns whether an environment variable is set and non-empty. */
function presence(name) {
  return `${name} ${process.env[name] ? 'present' : 'absent'}`;
}

/** Prints the gateway, host and key check lines and never fails. */
async function main() {
  try {
    console.log(await gatewayLine());
    console.log(await hostLine('api.github.com', 'https://api.github.com/zen'));
    console.log(await hostLine('example.com', 'https://example.com/'));
    for (const name of ['AI_GATEWAY_API_KEY', 'ANTHROPIC_API_KEY', 'CLAUDE_CODE_OAUTH_TOKEN']) {
      console.log(presence(name));
    }
  } catch {
    // Output is best effort; the exit code stays 0.
  }
  process.exitCode = 0;
}

await main();
