# Fix Slow Sign-in on Deployed Frontend

Status: package.json build fix done. Now fixing runtime hang.

- [ ] Update frontend/src/services/api.js: dynamic baseURL (dev localhost, prod /api) + axios timeout 10s
- [ ] Commit/push changes
- [ ] Add Vercel env if needed (VITE_API_URL=https://healthcare-saas-mozzymchanzs-projects.vercel.app/api )
- [ ] Test login on deployed site: fast sign-in (admin@example.com / pass123)
- [ ] Update TODO.md progress
