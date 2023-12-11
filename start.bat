@echo off
echo Checking dependencies...

python -c "import tqdm" 2>NUL
if errorlevel 1 (
    echo Installing tqdm...
    python -m pip install tqdm
)

python -c "import requests" 2>NUL
if errorlevel 1 (
    echo Installing requests...
    python -m pip install requests
)

echo Dependencies checked.

echo Starting file upload...
python duds_upload.py
pause
