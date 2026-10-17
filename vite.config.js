import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import chatHandler from './api/chat.js';

// Локально /api/chat обрабатывается прямо в dev-сервере Vite.
// Ключ берётся из файла .env.local и остаётся на сервере, в браузер не уходит.
function localChatApi(env) {
  return {
    name: 'local-chat-api',
    configureServer(server) {
      process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || '';

      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end();
        }

        let raw = '';
        for await (const chunk of req) raw += chunk;
        try {
          req.body = JSON.parse(raw || '{}');
        } catch {
          req.body = {};
        }

        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (obj) => {
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify(obj));
        };

        try {
          await chatHandler(req, res);
        } catch (err) {
          console.error('[chat] ошибка:', err);
          res.status(500).json({ error: 'Server error' });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), localChatApi(env)],
  };
});
