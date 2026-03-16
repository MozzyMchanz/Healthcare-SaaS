# Backend Auth Fixes for Fast Login

- [ ] Edit backend/server.js: CORS for Vercel domain
- [ ] Edit backend/controllers/authController.js: Use 'email' instead of 'username' (match frontend)
- [ ] Edit backend/models/User.js: Add findByUsername if needed, or align
- [ ] Run `node backend/seed.js` to create admin@example.com user
- [ ] Set Vercel env vars: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME=healthcare_saas, JWT_SECRET
- [ ] Commit/push, redeploy → login works
