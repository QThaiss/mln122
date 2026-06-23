# Deploy backend on Render

The repository includes `render.yaml` for the Express backend in `backend/`.

1. Push the repository to GitHub.
2. In Render, create a **Blueprint** and select the repository. Render reads `render.yaml` and creates the web service.
3. In the service environment variables, enter a valid `OPENAI_API_KEY`. Keep `PROVIDER=openai` and `OPENAI_MODEL=gpt-4o-mini`, or change them to a provider supported by `backend/.env.example`.
4. After deployment, open `https://<your-render-service>.onrender.com/api/health` to verify the backend is running.
5. In the deployed frontend host, set `VITE_API_BASE_URL=https://<your-render-service>.onrender.com` and redeploy the frontend.

The frontend uses the local Vite proxy when `VITE_API_BASE_URL` is empty. It uses the Render URL when the variable is set.
