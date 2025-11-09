#!/bin/bash
set -e
echo "Validating Apache2 is running..."
sudo systemctl status apache2 | grep "active (running)" > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ Apache2 is active and running."
else
  echo "❌ Apache2 failed to start."
  exit 1
fi

