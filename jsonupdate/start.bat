@echo off
REM 检查requests库是否已安装
python -m pip show requests
IF %ERRORLEVEL% NEQ 0 (
    echo requests库未安装，正在安装...
    python -m pip install -i https://pypi.tuna.tsinghua.edu.cn/simple requests
)

REM 运行Python脚本
python jsonupdate.py
pause
