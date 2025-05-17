# Adsiduous

## Project Overview
Build a scalable web app that allows users to:
1. Upload and preview multimedia files (images, videos, audio, PDFs) with secure
authentication.
2. Search for uploaded files using keywords (e.g., file name, tags).
3. Rank search results by relevance (e.g., view count, upload date, tags).
4. Deploy the app with a live demo link.

---

## System Requirements
Ensure your system meets the following requirements before proceeding:

- **Node.js**: v21.2.0 or higher
- **npm/yarn**: Latest version
- **MongoDB**: v4.0 or higher (for backend database)

## Tech Stack

- **Backend**: Node.js, Exprses, JWT, 
- **Database**: MongoDB, Cloudinary
- **Frontend**: React.js, Redux, Bootstrap

## Installation Instructions
In Github, client & server reside under the same directory, so just clone the parent one.
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git

### Backend (BE)

1. Change directory:
    ```bash
    cd server
2. Install dependencies:
   ```bash
   npm install
3. Copy all env's from env.example, create .env & paste all here
4. Make sure you have your mongo uri, cloudinary (api keys)
5. Start the backend server:
    ```bash
   npm run dev

Make sure to copy all envs from env.example to .env

### Frontend (FE)

1. Change directory:
    ```bash
    cd client
2. Install dependencies:
   ```bash
   npm install
3. Start the clinet:
    ```bash
   npm run dev

## Postman Collection
I have also added postman collection, please import it while calling API's

    ```bash
    ./adsiduous_collection.postman_collection.json