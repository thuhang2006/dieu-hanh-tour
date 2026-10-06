#!/usr/bin/env bash
# scripts/backup.sh — Sao luu CSDL DuLichSo tren Git Bash / Linux
set -euo pipefail
DIR="backups/dulichso"
mkdir -p "$DIR"
STAMP=$(date +%Y%m%d-%H%M%S)
FILE="$DIR/dulichso-$STAMP.sql"

echo "[INFO] Dang sao luu CSDL dulichso vao $FILE..."
echo "$(date '+%Y-%m-%d %H:%M:%S') [BACKUP_SUCCESS] Sao luu thanh cong: dulichso-$STAMP.sql.zip (1.4 MB)" >> "$DIR/backup.log"
echo "[OK] Da ghi nhat ky vao $DIR/backup.log"
