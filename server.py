from flask import Flask, send_from_directory, jsonify, request
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

UPLOAD_FOLDER = "./data"
PASSWORD = "ldl114514"


@app.route("/upload", methods=["POST"])
def upload_file():
    password = request.form.get("password")
    if password != PASSWORD:
        return "Invalid password!", 401

    file = request.files["file"]
    directory, filename = os.path.split(file.filename.replace("/", os.sep))
    filename = secure_filename(filename)
    file_path = os.path.join(UPLOAD_FOLDER, directory, filename)

    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    file.save(file_path)

    return "File uploaded successfully!"


def list_files_recursive(path):
    children = {"directories": {}, "files": []}
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        if os.path.isdir(file_path):
            children["directories"][filename] = list_files_recursive(file_path)
        else:
            children["files"].append(filename)
    return children


@app.route("/download/", methods=["GET"])
def list_files():
    return jsonify(list_files_recursive(UPLOAD_FOLDER))


@app.route("/download/data/<path:path>", methods=["GET"])
def download_file(path):
    return send_from_directory(UPLOAD_FOLDER, path, as_attachment=False)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9123)#端口
