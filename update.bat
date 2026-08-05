@echo off
chcp 65001 >nul
echo 正在準備更新你的 GitHub 專案...

git add .

set /p msg="請輸入 Commit 訊息 (直接按 Enter 會預設為 'Auto update'): "
if "%msg%"=="" set msg=Update posts/moments

git commit -m "%msg%"
git push

echo.
echo 更新已推送到 GitHub！
pause