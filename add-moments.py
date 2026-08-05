import os
import re
import datetime
import subprocess
import tkinter as tk
from tkinter import messagebox
import threading  # 新增：用於背景處理，防止畫面卡死

# 1. 設定你的 Astro 專案根目錄與動態存放資料夾
REPO_PATH = r"C:\Users\0624j\Desktop\blog" 
MOMENTS_DIR = os.path.join(REPO_PATH, "src", "moments")

def publish_moment():
    # 獲取文字框內的內容
    content = text_area.get("1.0", tk.END).strip()
    if not content:
        messagebox.showwarning("警告", "請輸入動態內容！")
        return

    # 點擊後先將按鈕反白並修改文字，防止重複點擊
    btn.config(state=tk.DISABLED, text="⏳ 正在推送到 GitHub，請稍候...")
    
    # 啟動背景執行緒來處理寫檔與 Git 推送
    # 這樣 GUI 畫面就不會卡住了
    threading.Thread(target=process_and_push, args=(content,), daemon=True).start()

def process_and_push(content):
    """這是在背景執行的任務"""
    try:
        os.makedirs(MOMENTS_DIR, exist_ok=True)

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
        file_path = os.path.join(MOMENTS_DIR, file_name)
        
        now = datetime.datetime.now()
        time_string = now.strftime("%Y/%m/%d %H:%M:%S")
        file_content = f'---\ndate: "{time_string}"\n---\n{content}\n'

        # 寫入 Markdown 檔案
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(file_content)

        # 執行 Git 指令 (加入 capture_output=True, text=True 才能捕捉真實錯誤)
        subprocess.run(["git", "add", "."], cwd=REPO_PATH, check=True, shell=True, capture_output=True, text=True)
        subprocess.run(["git", "commit", "-m", f"Add moment: {file_name}"], cwd=REPO_PATH, check=True, shell=True, capture_output=True, text=True)
        subprocess.run(["git", "push"], cwd=REPO_PATH, check=True, shell=True, capture_output=True, text=True)

        # 任務成功，通知主畫面更新 UI
        root.after(0, on_success)

    except subprocess.CalledProcessError as e:
        # Git 指令失敗
        error_msg = f"指令執行失敗：{e.cmd}\n\n詳細原因：\n{e.stderr}"
        root.after(0, on_error, error_msg)
    except Exception as e:
        # 其他未知的錯誤
        root.after(0, on_error, f"發生未知的錯誤：\n{e}")

# --- 以下是確保 UI 更新安全地回到主執行緒的輔助函式 ---
def on_success():
    messagebox.showinfo("成功", "🎉 動態已成功發布並推送到 GitHub！")
    text_area.delete("1.0", tk.END)
    reset_button()

def on_error(error_msg):
    messagebox.showerror("Git 錯誤", error_msg)
    reset_button()

def reset_button():
    btn.config(state=tk.NORMAL, text="🚀 發布並推送到 GitHub")

# 2. 建立 GUI 介面
root = tk.Tk()
root.title("發送新動態")
root.geometry("450x350")
root.configure(padx=20, pady=20)

tk.Label(root, text="今天想分享什麼？", font=("微軟正黑體", 12, "bold")).pack(anchor="w", pady=(0, 10))

# 支援多行的文字輸入框
text_area = tk.Text(root, height=10, width=50, font=("微軟正黑體", 11))
text_area.pack(fill="both", expand=True)

# 發布按鈕
btn = tk.Button(root, text="🚀 發布並推送到 GitHub", font=("微軟正黑體", 11, "bold"), bg="#4CAF50", fg="white", command=publish_moment)
btn.pack(pady=(15, 0), fill="x", ipady=5)

root.mainloop()