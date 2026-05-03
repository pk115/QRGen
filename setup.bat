@echo off
echo ===========================================
echo  QRGen - Setup Script
echo ===========================================
echo.

echo [1/4] Installing dependencies...
npm install
if %errorlevel% neq 0 (echo ERROR: npm install failed & pause & exit /b 1)

echo.
echo [2/4] Copying environment file...
if not exist .env.local (
  copy .env.example .env.local
  echo .env.local created from .env.example
) else (
  echo .env.local already exists
)

echo.
echo [3/4] Generating Prisma client...
npx prisma generate
if %errorlevel% neq 0 (echo ERROR: prisma generate failed & pause & exit /b 1)

echo.
echo [4/4] Pushing database schema...
npx prisma db push
if %errorlevel% neq 0 (echo ERROR: prisma db push failed & pause & exit /b 1)

echo.
echo ===========================================
echo  Setup complete!
echo  Run: npm run dev
echo  Open: http://localhost:3000
echo ===========================================
pause
