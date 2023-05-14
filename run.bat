@echo off
echo [1] Run
echo [2] Compile
echo [3] Install
set /p "q=[?]: "

if %q% == 1 call scripts/runDeno.bat
if %q% == 2 call scripts/compile.bat
if %q% == 3 call scripts/install.bat