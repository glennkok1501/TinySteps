# Use an official Python image as the base
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies
RUN apt update && apt install -y curl

# Install Ollama
RUN curl -fsSL https://ollama.com/install.sh | sh

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code into the container
COPY . .

# Expose the port for FastAPI
EXPOSE 8080

# Healthcheck to ensure Ollama is running
HEALTHCHECK --interval=10s --timeout=5s --retries=5 CMD curl -f http://localhost:11434 || exit 1

# Start Ollama, wait for it to initialize, pull the model, then start FastAPI
CMD ["sh", "-c", "ollama serve & sleep 5 && ollama pull llama3 && uvicorn server:app --host 0.0.0.0 --port 8080 --reload"]
