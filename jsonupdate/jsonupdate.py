import os
import glob
import time
import requests

# 设置服务器上传URL和密码
url = "http://124.221.198.113:9123/upload"
password = "ldl114514"  # 应替换为您的实际密码

# 获取当前目录下所有的 JSON 文件
json_files = glob.glob("*.json")

# 获取当前时间戳
timestamp = int(time.time())


# 遍历所有找到的 JSON 文件
for json_file in json_files:
    # 构建新的文件名
    new_filename = f"SanaeMatch-data-json-t{timestamp}t.json"
    # 重命名文件
    os.rename(json_file, new_filename)
    # 打印操作结果
    print(f"Renamed {json_file} to {new_filename}")
    # 上传文件
    with open(new_filename, "rb") as f:
        files = {"file": (new_filename, f)}
        headers = {"Password": password}
        response = requests.post(
            url, files=files, headers=headers, verify=False
        )  # verify=False 仅用于开发环境
        print(response.text)
    # 更新时间戳以避免文件名冲突
    timestamp += 1

# 获取img文件夹中的所有.png和.jpg图片文件
img_files = glob.glob("img/*.png") + glob.glob("img/*.jpg")

# 遍历所有找到的图片文件
for img_file in img_files:
    # 上传文件
    with open(img_file, "rb") as f:
        files = {"file": (os.path.basename(img_file), f)}
        headers = {"Password": password}
        response = requests.post(
            url, files=files, headers=headers, verify=False
        )  # verify=False 仅用于开发环境
        print(f"Uploaded {img_file}: {response.text}")
