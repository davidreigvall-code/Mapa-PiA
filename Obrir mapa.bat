@echo off
cd /d "%~dp0"
start "Mapa PiA - servidor local (no tancar mentre treballes)" cmd /k node ".claude\dev-server.js"
timeout /t 1 /nobreak >nul
start "" http://localhost:5510
