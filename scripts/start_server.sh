#!/bin/bash
set -e
echo "Starting Apache2 service..."
sudo systemctl start apache2
sudo systemctl enable apache2


