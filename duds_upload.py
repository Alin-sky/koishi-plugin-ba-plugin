import os
import requests
import time
from tqdm import tqdm

SERVER_URL = 'http://124.221.198.113:9123'
PASSWORD = 'ldl114514'
DATA_FOLDER = './data'
RETRY_TIMES = 3
SLEEP_TIME = 2  # 两次尝试之间的等待时间（秒）

def get_all_files(directory):
    for dirpath, dirnames, filenames in os.walk(directory):
        for filename in filenames:
            yield os.path.join(dirpath, filename)

def upload_files():
    files = list(get_all_files(DATA_FOLDER))
    with tqdm(total=len(files), desc="Uploading files", unit="file", dynamic_ncols=True, bar_format='{l_bar}{bar}| {n_fmt}/{total_fmt}') as pbar:
        for filepath in files:
            relative_filepath = os.path.relpath(filepath, DATA_FOLDER).replace("\\", "/")

            for i in range(RETRY_TIMES):
                try:
                    with open(filepath, 'rb') as file:
                        response = requests.post(
                            f'{SERVER_URL}/upload',
                            files={'file': (relative_filepath, file)},
                            data={'password': PASSWORD},
                            stream=True
                        )
                    if response.status_code == 200:
                        print(f'File {relative_filepath} uploaded successfully!')
                        pbar.update(1)
                        break
                    else:
                        print(f'Failed to upload file {relative_filepath}. Server responded with: {response.text}')
                        if i < RETRY_TIMES - 1:  # 如果不是最后一次尝试，等待一段时间再尝试
                            time.sleep(SLEEP_TIME)
                except Exception as e:
                    print(f'An error occurred while uploading file {relative_filepath}: {e}')
                    if i < RETRY_TIMES - 1:  # 如果不是最后一次尝试，等待一段时间再尝试
                        time.sleep(SLEEP_TIME)

upload_files()
