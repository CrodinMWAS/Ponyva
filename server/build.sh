#!/bin/bash

ExeName="server"

GOOS="windows"

# Check if the build directory exists, if not, create it
if [ ! -d "./build" ]; then
    mkdir ./build
fi

# Remove existing executable if it exists
if [ -f "./build/$ExeName" ]; then
    rm "./build/$ExeName"
fi

# Build the Go project
go build -v -o "./build/$ExeName" ./src/main.go

# Execute the binary if it exists
if [ -f "./build/$ExeName" ]; then
    pushd ./build
    ./"$ExeName"
    popd
fi
