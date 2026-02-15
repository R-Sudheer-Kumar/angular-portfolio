#!/bin/bash
set -e

echo "=== STARTUP DIAGNOSTICS ==="
echo "Current Directory: $(pwd)"
echo "Listing Directory:"
ls -F

echo "Checking Python Version:"
python --version

echo "Checking Installed Packages:"
pip list

echo "Testing Application Import:"
export PYTHONPATH=$PYTHONPATH:$(pwd)
python -c "import sys; print('Sys Path:', sys.path); from app.main import app; print('Successfully imported app object')"

if [ $? -eq 0 ]; then
    echo "Import check passed. Starting Server..."
    # Run uvicorn
    exec uvicorn app.main:app --host 0.0.0.0 --port $PORT
else
    echo "CRITICAL: Import check failed!"
    exit 1
fi
