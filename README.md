

                                                                       @@@                          
                                                                      @@@@@                         
                                                                      @@@@                          
                                                                      @@@@                          
                         @@@@@              ==           @@@@        @@@@@                          
                      @@@@@@@@@@@          ===        @@@@@@@@@@     @@@@@   @@@@@                  
                     @@@@@   @@@@@        =====     @@@@@@  @@@@@@   @@@@  @@@@@@                   
                    @@@@       @@@@      ======     @@@@      @@@@  @@@@@@@@@@@                     
                   @@@@@       @@@@    =========   @@@@@            @@@@@@@@@                       
                   @@@@@      @@@@@    =========   @@@@             @@@@@@@@@                       
                   @@@@       @@@@@  ===========   @@@@             @@@@  @@@@                      
                  @@@@@@     @@@@@  ======  =====  @@@@@     @@@@  @@@@@  @@@@@                     
                  @@@@@@@@@@@@@@@   ====     ====   @@@@@@@@@@@@@  @@@@    @@@@@                    
                  @@@@ @@@@@@@@@  =====       ====    @@@@@@@@@    @@@@     @@@@@                   
                  @@@@                                                                              
                 @@@@@                                                                              
                 @@@@@                                                                              
                 @@@@                                                                               
                 @@@@                                                                               

# 🗂️ Pack File Viewer

**Pack File Viewer** is a modern web-based platform for uploading, managing, and previewing various types of files. Built with **SvelteKit**, **TypeScript**, **Supabase**, and **Docker**, it enables fast file management with a clean and intuitive UI.


## ✨ Features

- 📥 Upload various files: PDFs, images, videos, presentations, text files, and more.
- 🧾 Dynamic preview modal depending on file type (PDF, image, text, video, unsupported).
- 🔍 Search and filter through resources.
- 📤 Form-based uploads with field validation.
- ❌ Delete files directly from the table.
- 🐳 Fully containerized with Docker.

---

## ✅ Requirements

Make sure you have the following tools installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

---

## 🚀 Step-by-step local installation

### 1. Clone the repository

```bash
git clone https://github.com/marco-hustler/pack-file-viewer.git
cd pack-file-viewer
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Start the project with Docker

The project includes Docker support for both frontend (`web`) and database fallback (`db` via Supabase/PostgreSQL).  
To start everything locally:

```bash
docker compose up --build
```

This command will:

- Build the web container
- Start the web application and PostgreSQL instance
- Serve the app on [http://localhost:5173](http://localhost:5173)

> ℹ️ Make sure Docker Desktop is running and port 5173 is available.

### 💡 Alternative: Run without Docker (Frontend only)

If you want to develop only the frontend, you can use the SvelteKit dev server:

```bash
npm run dev
```

---

## 🏗️ Build and Preview

To create a production-ready version of the app:

```bash
npm run build
```

To preview the build locally:

```bash
npm run preview
```

---

## 🧱 Tech Stack

| Technology    | Role                                   |
|---------------|----------------------------------------|
| **SvelteKit** | Frontend framework                     |
| **TypeScript**| Static typing                          |
| **Supabase**  | Backend service (DB, storage, auth)    |
| **PostgreSQL**| Database (via Supabase)                |
| **Docker**    | Containerization for dev/prod parity   |

---

## 📄 License

All logos, branding elements, and visual styles used in this project are the exclusive property of https://new.thepack.tech. They have been included solely for the purpose of visual coherence and consistent design representation within the context of this viewer. Their presence does not imply ownership, endorsement, or affiliation.
