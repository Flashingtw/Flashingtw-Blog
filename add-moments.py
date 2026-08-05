import os
import re
import datetime
import subprocess
import tkinter as tk
from tkinter import messagebox

# 1. 設定你的 Astro 專案根目錄與動態存放資料夾
# 請將這裡替換成你電腦裡真實的專案路徑
REPO_PATH = r"C:\Users\0624j\Desktop\blog" 
MOMENTS_DIR = os.path.join(REPO_PATH, "src", "moments")

def publish_moment():
    # 獲取文字框內的內容 (支援多行排版)
    content = text_area.get("1.0", tk.END).strip()
    if not content:
        messagebox.showwarning("警告", "請輸入動態內容！")
        return

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

    try:
        # 寫入 Markdown 檔案
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(file_content)

        # 執行 Git 指令 (在專案根目錄下執行)
        subprocess.run(["git", "add", "."], cwd=REPO_PATH, check=True, shell=True)
        subprocess.run(["git", "commit", "-m", f"Add moment: {file_name}"], cwd=REPO_PATH, check=True, shell=True)
        subprocess.run(["git", "push"], cwd=REPO_PATH, check=True, shell=True)

        messagebox.showinfo("成功", "🎉 動態已成功發布並推送到 GitHub！")
        text_area.delete("1.0", tk.END) # 清空文字框

    except subprocess.CalledProcessError as e:
        messagebox.showerror("Git 錯誤", f"推送失敗，請檢查 Git 設定。\n{e}")
    except Exception as e:
        messagebox.showerror("錯誤", f"發生未知的錯誤：\n{e}")

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