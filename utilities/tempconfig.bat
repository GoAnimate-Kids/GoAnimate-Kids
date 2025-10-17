:: GoAnimate Kids Config
:: This file is modified by settings.bat. It is not organized, but comments for each setting have been added.
:: You should be using settings.bat, and not touching this. Offline relies on this file remaining consistent, and it's easy to mess that up.

:: Opens this file in Notepad when run
setlocal
if "%SUBSCRIPT%"=="" ( pushd "C:\Users\cujoj\Downloads\GoAnimate-Kids-main\" & start notepad.exe config.bat & exit )
endlocal

:: Shows exactly Offline is doing, and never clears the screen. Useful for development and troubleshooting. Default: n
set VERBOSEWRAPPER=n

:: Won't check for dependencies (flash, node, etc) and goes straight to launching. Useful for speedy launching post-install. Default: n
set SKIPCHECKDEPENDS=n

:: Won't install dependencies, regardless of check results. Overridden by SKIPCHECKDEPENDS. Mostly useless, why did I add this again? Default: n
set SKIPDEPENDINSTALL=n

:: Opens Offline in an included copy of ungoogled-chromium. Allows continued use of Flash as modern browsers disable it. Default: y
