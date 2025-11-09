#!/bin/bash
set -e
echo "Stopping Apache2 service if running..."
sudo systemctl stop apache2 || true

