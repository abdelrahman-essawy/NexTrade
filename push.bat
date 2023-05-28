@echo off
setlocal EnableDelayedExpansion

REM Array of random commit messages
set "commitMessages[0]=Added new feature"
set "commitMessages[1]=Fixed a bug"
set "commitMessages[2]=Updated CSS styles"
set "commitMessages[3]=Refactored JavaScript code"
set "commitMessages[4]=Optimized page loading time"

REM Change to your Git repository directory
cd /d "I:\nextjs\fullstack-nextjs-ecommerce"

REM Loop through each modified file and commit the changes
for /f "tokens=2*" %%A in ('git status --porcelain') do (
  set "file=%%B"
  git add "!file!"
  set /a "randomIndex=!random! %% 5"
  set "message=!commitMessages[%randomIndex%]!"
  git commit -m "!message!"
)

REM Push the changes to the remote repository
git push

echo All changes have been pushed and committed.
pause
