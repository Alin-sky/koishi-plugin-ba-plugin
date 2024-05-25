@echo off
chcp 65001
echo 检查cos-python-sdk-v5库是否已安装...
pip list | findstr /C:"cos-python-sdk-v5" > nul
if %errorlevel%==0 (
    echo cos-python-sdk-v5库已安装，跳过安装步骤。
) else (
    echo cos-python-sdk-v5库未安装，正在安装...
    pip install -U cos-python-sdk-v5 || goto error
)

echo 所需库安装完成，正在启动脚本...
python fmps_txcos.py
goto end

:error
echo 发生错误，无法安装所需的Python库。
pause
goto end

:end
echo 运行完毕，请按任意键退出...
pause
