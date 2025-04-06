export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow'
    });

    return res.status(200).json({ expandedUrl: response.url });
  } catch (error) {
    console.error('Expansion error:', error);
    return res.status(500).json({ error: 'Could not expand the URL' });
  }
}
