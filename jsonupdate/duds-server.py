from flask import Flask, request, abort, send_from_directory, jsonify
import os

app = Flask(__name__)

# 设置文件夹路径
json_folder = "./json"
img_folder = "./img"

# 设置预设密码
SECRET_PASSWORD = "ldl114514"

# 确保文件夹存在
os.makedirs(json_folder, exist_ok=True)
os.makedirs(img_folder, exist_ok=True)


# 递归遍历指定文件夹及其子文件夹内的所有文件名
def list_files_recursive(directory):
    files_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            # 生成从根目录开始的文件路径
            files_list.append(os.path.relpath(os.path.join(root, file), directory))
    return files_list


# 获取json和img文件夹内的所有文件名
@app.route("/files", methods=["GET"])
def list_files():
    json_files = list_files_recursive(json_folder)
    img_files = list_files_recursive(img_folder)
    return jsonify({"json": json_files, "img": img_files})


# 下载指定的文件，包括子目录中的文件
@app.route("/download/<path:filename>", methods=["GET"])
def download_file(filename):
    # 防止路径遍历漏洞
    if ".." in filename or filename.startswith("/"):
        return "非法的文件路径", 400
    # 确定文件所在的目录
    if filename.startswith("json/"):
        directory = json_folder
    elif filename.startswith("img/"):
        directory = img_folder
    else:
        return "文件不在允许的目录中", 400
    return send_from_directory(directory, filename.split("/")[-1], as_attachment=True)


@app.route("/upload", methods=["POST"])
def upload_file():
    # 验证密码
    password = request.headers.get("Password")
    if password != SECRET_PASSWORD:
        abort(401)  # 如果密码不匹配，返回401错误

    uploaded_file = request.files["file"]
    if uploaded_file:
        # 获取文件名
        filename = uploaded_file.filename
        # 检查文件扩展名
        file_extension = os.path.splitext(filename)[1].lower()
        if file_extension in [".json"]:
            file_path = os.path.join(json_folder, filename)
        elif file_extension in [".jpg", ".jpeg", ".png"]:
            file_path = os.path.join(img_folder, filename)
        else:
            return "File type not supported", 400

        # 保存文件
        uploaded_file.save(file_path)
        return "File uploaded successfully"
    return "No file uploaded"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)  # 默认为 HTTP
