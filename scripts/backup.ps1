# scripts/backup.ps1 — Kich ban sao luu CSDL DuLichSo
$ErrorActionPreference = "Stop"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$dir = "C:\xampp\mysql\data\backups\dulichso"
if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force }

$file = Join-Path $dir "dulichso-$stamp.sql"
Write-Host "Dang thuc hien xuat CSDL bang mysqldump..." -ForegroundColor Cyan

& "C:\xampp\mysql\bin\mysqldump.exe" -u root --single-transaction dulichso --result-file=$file

if ((Get-Item $file).Length -eq 0) { throw "LOI: Tep sao luu bi rong!" }

Compress-Archive -Path $file -DestinationPath "$file.zip" -Force
Remove-Item $file

$logMsg = "{0} [BACKUP_SUCCESS] Sao luu thanh cong: {1}.zip" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), "dulichso-$stamp.sql"
$logMsg | Add-Content (Join-Path $dir "backup.log")

Write-Host $logMsg -ForegroundColor Green
