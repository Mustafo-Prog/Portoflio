// Vercel serverless-функция. Ключ ANTHROPIC_API_KEY хранится в настройках Vercel и не попадает в браузер.
const SYSTEM_PROMPT = `Ты помогаешь рекрутерам узнать о Mustafo Murtazaev.
Отвечай только по фактам ниже. Если факта нет, скажи, что лучше уточнить у Mustafo, и дай почту.
Не придумывай опыт работы, даты и проекты.

Факты:
- Full Stack-разработчик, учится в Najot Talim (курс Full Stack Development).
- Языки: узбекский — родной, русский — почти родной, английский — B2.
- Стек: HTML, CSS, JavaScript, React, TypeScript, Node.js, Express.js, NestJS, MongoDB, PostgreSQL, Tailwind CSS.
- Опыт: учебные и личные проекты на React и Node.js.
- Проекты: TaskFlow (taskflowtools.netlify.app), Gastro Shef (gastro-shef.netlify.app).
- В планах: Telegram copy и Netflix copy.
- Интересы: футбол, баскетбол, настольный теннис.
- Контакты: mustafomurtazaev7@gmail.com, t.me/mustafoprog, github.com/Mustafo-Prog.

Отвечай коротко, 2–4 предложения. Отвечай на языке последнего вопроса.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages = [] } = req.body ?? {};
  const cleaned = messages
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  if (cleaned.length === 0 || cleaned[cleaned.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'Bad request' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-5-5',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: cleaned,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: 'Upstream error' });
    }

    const data = await response.json();
    const reply = (data.content ?? []).map((b) => b.text ?? '').join('').trim();
    return res.status(200).json({ reply });
  } catch {
    return res.status(500).json({ error: 'Server error' });
  }
}
