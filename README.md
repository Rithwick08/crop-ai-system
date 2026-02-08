# Crop AI System

A machine learning-based crop recommendation and disease detection system. This application helps farmers make informed decisions by recommending suitable crops based on soil and weather conditions.

## Features

- **Crop Recommendation**: Predicts the best crop to plant based on Nitrogen (N), Phosphorus (P), Potassium (K), pH level, state, and city.
- **Weather Integration**: Automatically fetches temperature and humidity data for the specified location using WeatherAPI.

## Requirements

- **Python**: 3.8 or higher
- **Node.js**: 16.0 or higher
- **npm**: Installed with Node.js

## Setup and Installation

### 1. Clone the Repository
```bash
git clone <repository_url>
cd crop-ai-system
```

### 2. Backend Setup
Navigate to the backend directory and install the required Python packages:

#### macOS / Linux
```bash
cd backend
# Create a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Windows
```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup
Navigate to the frontend directory and install the required Node.js packages:

```bash
cd ../frontend
npm install
```

## Running the Application

### 1. Start the Backend Server
From the `backend` directory:

#### macOS / Linux
```bash
source venv/bin/activate
uvicorn app:app --reload
```

#### Windows
```bash
venv\Scripts\activate
uvicorn app:app --reload
```

The backend server will start at `http://127.0.0.1:8000`.

### 2. Start the Frontend Development Server
From the `frontend` directory:

```bash
npm run dev
```
The frontend application will be accessible at `http://localhost:3000`.

## Configuration

- **Weather API**: The system uses WeatherAPI.com. The API key is currently configured in `backend/weather.py`. If you have your own key, you can update it there.
