# Use an official Python image as the base
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies
RUN apt update && apt install -y curl

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code into the container
COPY . .

# Expose the port for FastAPI
EXPOSE 8081

# start Python FastAPI server
CMD ["sh", "-c", "uvicorn server:app --host 0.0.0.0 --port 8081 --reload"]
