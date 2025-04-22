@echo off
echo clean doc directory...
if exist doc\* del /Q /F doc\*

echo start building site...
call bundle exec jekyll build

echo build completed! files generated to doc directory 