#!/usr/bin/env bash
set -e

# Enable Docker BuildKit (required for --secret)
export DOCKER_BUILDKIT=1

# Read all non-comment, non-empty lines from .env
secrets=()
echo "Passing the following secrets to Docker build:"
while IFS='=' read -r key value; do
  # skip empty lines or comments
  [[ -z "$key" || "$key" =~ ^# ]] && continue

  # Print the key only (not the value)
  echo "  - $key"

  # Create a temporary file for each secret
  echo -n "$value" > "$key"
  chmod 600 "$key"

  # Add to Docker build --secret arguments
  secrets+=(--secret id="$key",src="$key")
done < .env

# Build the Docker image with all secrets
docker build "${secrets[@]}" -t leesavage09/nanet-portfolio:latest .

# Clean up all temporary secret files
for f in $(cut -d= -f1 .env | grep -v '^#' | grep -v '^$'); do
  rm -f "$f"
done
