#!/bin/bash

echo "Starting American Pizza API..."

if [ ! -f .env ]; then
    echo "Error: .env file not found!"
    echo "Copy .env.example to .env and fill in your credentials"
    exit 1
fi

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo "Starting server..."
python main.py
