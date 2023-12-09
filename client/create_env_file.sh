#!/bin/bash

# Specify the path for the .env file
env_file=".env"

# Create or overwrite the .env file
echo "# .env file" > "$env_file"

# Function to add or update an environment variable
add_or_update_variable() {
  echo "$1=$2" >> "$env_file"
}

# Process command-line arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    api_url=*)
      add_or_update_variable "REACT_APP_API_URL" "${1#*=}"
      ;;
    api_port=*)
      add_or_update_variable "REACT_APP_API_PORT" "${1#*=}"
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
  shift
done

echo "The .env file has been created/updated successfully."
