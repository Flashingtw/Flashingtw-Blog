import os
import re
import datetime
import subprocess
import tkinter as tk
from tkinter import messagebox
import threading
from pathlib import Path

# 預設以腳本所在位置作為專案根目錄，不再綁定特定電腦路徑。
REPO_PATH = Path(__file__).resolve().parent
MOMENTS_DIR = REPO_PATH / "src" / "moments"

TRANSLATIONS = {
    "zh-TW": {
        "window_title": "發送新動態",
        "prompt": "今天想分享什麼？",
        "publish": "🚀 發布並推送到 GitHub",
        "publishing": "⏳ 正在推送到 GitHub，請稍候...",
        "warning": "警告",
        "empty_content": "請輸入動態內容！",
        "success": "成功",
        "success_message": "🎉 動態已成功發布並推送到 GitHub！",
        "git_error": "Git 錯誤",
        "command_failed": "指令執行失敗：{command}\n\n詳細原因：\n{detail}",
        "unknown_error": "發生未知的錯誤：\n{detail}",
        "commit_message": "新增動態：{filename}",
    },
    "zh-CN": {
        "window_title": "发布新动态",
        "prompt": "今天想分享什么？",
        "publish": "🚀 发布并推送到 GitHub",
        "publishing": "⏳ 正在推送到 GitHub，请稍候...",
        "warning": "警告",
        "empty_content": "请输入动态内容！",
        "success": "成功",
        "success_message": "🎉 动态已成功发布并推送到 GitHub！",
        "git_error": "Git 错误",
        "command_failed": "命令执行失败：{command}\n\n详细原因：\n{detail}",
        "unknown_error": "发生未知错误：\n{detail}",
        "commit_message": "新增动态：{filename}",
    },
    "en": {
        "window_title": "Publish a moment",
        "prompt": "What would you like to share today?",
        "publish": "🚀 Publish and push to GitHub",
        "publishing": "⏳ Pushing to GitHub, please wait...",
        "warning": "Warning",
        "empty_content": "Please enter some content.",
        "success": "Success",
        "success_message": "🎉 The moment was published and pushed to GitHub.",
        "git_error": "Git error",
        "command_failed": "Command failed: {command}\n\nDetails:\n{detail}",
        "unknown_error": "An unexpected error occurred:\n{detail}",
        "commit_message": "Add moment: {filename}",
    },
    "ja": {
        "window_title": "ひとことを投稿",
        "prompt": "今日は何を共有しますか？",
        "publish": "🚀 投稿して GitHub にプッシュ",
        "publishing": "⏳ GitHub にプッシュしています...",
        "warning": "警告",
        "empty_content": "内容を入力してください。",
        "success": "完了",
        "success_message": "🎉 投稿を GitHub にプッシュしました。",
        "git_error": "Git エラー",
        "command_failed": "コマンドに失敗しました：{command}\n\n詳細：\n{detail}",
        "unknown_error": "予期しないエラーが発生しました：\n{detail}",
        "commit_message": "投稿を追加：{filename}",
    },
}

LANGUAGE = os.getenv("MOMENTS_LANG", "zh-TW")
if LANGUAGE not in TRANSLATIONS:
    LANGUAGE = "zh-TW"


def tr(key, **values):
    return TRANSLATIONS[LANGUAGE][key].format(**values)


def run_git(*args):
    return subprocess.run(
        ["git", *args],
        cwd=REPO_PATH,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )

def publish_moment():
    # 獲取文字框內的內容
    content = text_area.get("1.0", tk.END).strip()
    if not content:
        messagebox.showwarning(tr("warning"), tr("empty_content"))
        return

    # 點擊後先將按鈕反白並修改文字，防止重複點擊
    btn.config(state=tk.DISABLED, text=tr("publishing"))
    
    # 啟動背景執行緒來處理寫檔與 Git 推送
    # 這樣 GUI 畫面就不會卡住了
    threading.Thread(target=process_and_push, args=(content,), daemon=True).start()

def process_and_push(content):
    """這是在背景執行的任務"""
    try:
        MOMENTS_DIR.mkdir(parents=True, exist_ok=True)

        # 找出最大的 blog-X
        max_num = 0
        for filename in os.listdir(MOMENTS_DIR):
            match = re.match(r"^blog-(\d+)\.md$", filename)
            if match:
                num = int(match.group(1))
                if max_num < num:
                    max_num = num

        # 設定新檔名與時間
        next_num = max_num + 1
        file_name = f"blog-{next_num}.md"
        file_path = MOMENTS_DIR / file_name
        
        now = datetime.datetime.now().astimezone()
        time_string = now.isoformat(timespec="seconds")
        file_content = f'---\ndate: "{time_string}"\n---\n{content}\n'

        # 寫入 Markdown 檔案
        with file_path.open("w", encoding="utf-8", newline="\n") as f:
            f.write(file_content)

        # 僅提交這次新增的動態，避免夾帶工作區內其他尚未完成的修改。
        relative_file = file_path.relative_to(REPO_PATH).as_posix()
        run_git("add", "--", relative_file)
        run_git(
            "commit",
            "--only",
            "-m",
            tr("commit_message", filename=file_name),
            "--",
            relative_file,
        )
        run_git("push")

        # 任務成功，通知主畫面更新 UI
        root.after(0, on_success)

    except subprocess.CalledProcessError as e:
        # Git 指令失敗
        error_msg = tr(
            "command_failed",
            command=" ".join(e.cmd),
            detail=e.stderr or e.stdout or str(e),
        )
        root.after(0, on_error, error_msg)
    except Exception as e:
        # 其他未知的錯誤
        root.after(0, on_error, tr("unknown_error", detail=e))

# --- 以下是確保 UI 更新安全地回到主執行緒的輔助函式 ---
def on_success():
    messagebox.showinfo(tr("success"), tr("success_message"))
    text_area.delete("1.0", tk.END)
    reset_button()

def on_error(error_msg):
    messagebox.showerror(tr("git_error"), error_msg)
    reset_button()

def reset_button():
    btn.config(state=tk.NORMAL, text=tr("publish"))

# 2. 建立 GUI 介面
root = tk.Tk()
root.title(tr("window_title"))
root.geometry("450x350")
root.configure(padx=20, pady=20)

tk.Label(root, text=tr("prompt"), font=("微軟正黑體", 12, "bold")).pack(anchor="w", pady=(0, 10))

# 支援多行的文字輸入框
text_area = tk.Text(root, height=10, width=50, font=("微軟正黑體", 11))
text_area.pack(fill="both", expand=True)

# 發布按鈕
btn = tk.Button(root, text=tr("publish"), font=("微軟正黑體", 11, "bold"), bg="#4CAF50", fg="white", command=publish_moment)
btn.pack(pady=(15, 0), fill="x", ipady=5)

root.mainloop()
