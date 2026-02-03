# 🎬 ReelTalk – Full-Stack Movie Review Platform

ReelTalk is a full-stack web application that allows users to discover movies, write reviews, rate films, and engage with a film-focused community. The platform integrates real movie data and provides an interactive user experience built with modern web technologies.

🔗 **Live Application:** https://reeltalk-capstone.netlify.app/

---

## 🚀 Overview

ReelTalk was designed and developed as a full-stack application demonstrating end-to-end software development, including frontend UI design, backend API development, database management, authentication, and third-party API integration.

This project highlights real-world development practices such as structured project architecture, RESTful communication, state management, and dynamic data rendering.

---

## ✨ Features

- Secure user authentication (login/logout)
- Create, edit, and delete movie reviews (CRUD functionality)
- Star-based movie rating system
- Movie filtering and sorting
- User profile displaying personal reviews
- Dynamic movie data, posters, and details powered by an external API

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Mantine UI
- Axios

### Backend
- Python
- Flask (REST API)

### Database
- SQLite
- SQLAlchemy ORM

### Authentication
- Custom authentication with session management

### External API
- The Movie Database (TMDb) API for movie data and media assets

---

## 🧩 System Architecture

ReelTalk follows a full-stack architecture:

- **Frontend:** Handles UI, state, and API communication  
- **Backend:** Processes requests, handles authentication, and manages database operations  
- **Database:** Stores user accounts and review data  
- **Third-Party API:** Supplies movie information and media

---

## ⚙️ Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/willanilove/ReelTalk-Capstone.git
cd ReelTalk-Capstone
```
---

## Backend Setup

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 app.py
```

---

## Frontend Setup

```bash
cd Frontend/capstone-frontend
pnpm install
pnpm run dev
```
