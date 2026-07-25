# LeadDesk Mini - Production Deployment & Infrastructure Guide

This guide provides step-by-step instructions for deploying **LeadDesk Mini** to production using **MongoDB Atlas** and **Vercel**.

---

## 1. MongoDB Atlas Setup Guide

### Step 1: Create a MongoDB Atlas Cluster
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Project named `LeadDesk-Mini`.
3. Build a Cluster (Select **M0 Free Tier** or **M10+ Dedicated** depending on volume).
4. Select your preferred Cloud Provider and Region (e.g., AWS / `us-east-1`).

### Step 2: Configure Database Security
1. Navigate to **Security → Database Access**:
   - Click **Add New Database User**.
   - Set **Authentication Method**: Password.
   - Set Username: `leaddesk_admin`.
   - Set Password: Generate a strong password (save securely).
   - Set Database User Privileges: `Read and write to any database`.
2. Navigate to **Security → Network Access**:
   - Click **Add IP Address**.
   - Select **Allow Access From Anywhere** (`0.0.0.0/0`) to permit Vercel serverless function IPs to connect dynamically.

### Step 3: Obtain Connection String
1. Navigate to **Database → Clusters → Connect**.
2. Select **Drivers** (Node.js).
3. Copy the URI string:
   ```text
   mongodb+srv://leaddesk_admin:<password>@cluster0.abcde.mongodb.net/leaddesk_mini?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your database user password and `leaddesk_mini` as the target database.

---

## 2. Vercel Production Deployment

### Step 1: Push Repository to GitHub
Ensure all code and documentation are committed:
```bash
git add .
git commit -m "build: prepare production deployment configuration"
git push origin main
```

### Step 2: Import Project into Vercel
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New... → Project**.
3. Import `SarveshHardas/LeadDesk-DigitalHeroess`.
4. Framework Preset: **Next.js** (Automatically detected).
5. Root Directory: `./` (Default).

### Step 3: Configure Environment Variables
Add the following Environment Variables under **Project Settings → Environment Variables**:

| Variable Name | Example Value | Description |
| :--- | :--- | :--- |
| `MONGODB_URI` | `mongodb+srv://leaddesk_admin:<password>@cluster0.abcde.mongodb.net/leaddesk_mini?retryWrites=true&w=majority` | Production MongoDB Atlas URI |
| `AUTH_SECRET` | `9e7f4a21b38d605c1e4f82a93701d5ce6b4fa29817e0349c5d1b6e82f704a391` | Cryptographically secure 256-bit JWT secret |
| `ADMIN_EMAIL` | `admin@leaddesk.com` | Production admin email |
| `ADMIN_PASSWORD` | `AdminPassword123!` | Production admin password |

### Step 4: Deploy & Verify
1. Click **Deploy**.
2. Vercel will run Turbopack compilation:
   ```bash
   npm run build
   ```
3. Once completed, your application will be live at `https://<your-app-name>.vercel.app`.

---

## 3. Local Production Preview

To test production build behavior locally before deploying:

```bash
# 1. Verify strict TypeScript compilation
npx tsc --noEmit

# 2. Run ESLint code check
npm run lint

# 3. Compile production bundle
npm run build

# 4. Launch production server
npm run start
```
Open `http://localhost:3000` to verify prerendered pages and edge middleware execution.

---

## 4. Troubleshooting & Deployment Gotchas

### Issue A: Mongoose `MongooseError: Operation timed out`
- **Cause**: MongoDB Atlas Network Access IP whitelist is blocking Vercel.
- **Fix**: Verify that `0.0.0.0/0` is added to Atlas Network Access settings.

### Issue B: Admin Session Cookie Not Saved on Local Host
- **Cause**: Browser blocking HTTP-only cookies without HTTPS.
- **Fix**: `lib/session.ts` automatically detects `process.env.NODE_ENV === 'production'` to set the `Secure` attribute only over HTTPS while allowing HTTP on `localhost`.

### Issue C: Invalid JWT Key Length Error
- **Cause**: `AUTH_SECRET` is too short for HS256 encryption.
- **Fix**: Ensure `AUTH_SECRET` is at least 32 characters long (256 bits).
