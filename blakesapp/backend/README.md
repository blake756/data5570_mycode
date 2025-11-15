# Django Backend Setup

## Installation

1. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

4. (Optional) Create a superuser for admin access:
```bash
python manage.py createsuperuser
```

5. Run the development server:
```bash
python manage.py runserver 0.0.0.0:8000
```

## API Endpoints

- `GET /api/tasks/` - List all tasks
- `POST /api/tasks/` - Create a new task
- `GET /api/tasks/{id}/` - Get a specific task
- `PUT /api/tasks/{id}/` - Update a task
- `DELETE /api/tasks/{id}/` - Delete a task

## CORS Configuration

CORS is configured to allow requests from:
- `http://localhost:8081`
- `http://127.0.0.1:8081`

For production, update `CORS_ALLOWED_ORIGINS` in `backend/settings.py` or use your Cloudflare tunnel URL.

## Production Deployment

1. Update `ALLOWED_HOSTS` in `backend/settings.py` with your EC2 IP or domain
2. Set `DEBUG = False` in production
3. Update `SECRET_KEY` with a secure random key
4. Use Cloudflare tunnel for HTTPS:
```bash
cloudflared tunnel --url http://localhost:8000
```

