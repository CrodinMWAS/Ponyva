@echo off

set ExeName=server

set GOOS=windows

if not exist .\build (
    mkdir .\build
)

if exist .\build\%ExeName%.exe (
    del .\build\%ExeName%.exe
)

go build -v -o .\build\%ExeName%.exe .\src\main.go

if exist .\build\%ExeName%.exe (
    pushd .\build
    .\%ExeName%.exe
    popd
)