// Vercel serverless function – serves API keys from environment variables.
// The browser cannot access process.env directly; this endpoint bridges the gap.
// Keys are served over HTTPS and never logged or cached.
module.exports = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    const xaiKey = process.env.XAI_API_KEY || '';
    const hfKey = process.env.HUGGINGFACE_API_KEY || '';

    // Only return keys that are actually set – never return empty strings.
    const config = {};
    if (xaiKey) config.xaiKey = xaiKey;
    if (hfKey) config.huggingfaceKey = hfKey;

    res.status(200).json(config);
};
