@echo off
echo ========================================
echo Git Setup - First Time Configuration
echo ========================================
echo.

set /p NAME="Enter your name (e.g., Alex Smith): "
set /p EMAIL="Enter your email (e.g., alex@example.com): "

echo.
echo Setting up Git with:
echo Name: %NAME%
echo Email: %EMAIL%
echo.

git config --global user.name "%NAME%"
git config --global user.email "%EMAIL%"

echo.
echo ✓ Git configured successfully!
echo.
echo Now staging your changes...
git add .

echo.
echo Creating commit...
git commit -m "Complete site optimization: SEO, images, mobile responsive, Vercel deployment ready"

echo.
echo ========================================
echo Ready to push! Run this command:
echo   git push origin main
echo ========================================
echo.
pause
