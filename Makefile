
PROJECT_NAME="metroid"

install:
    @echo "Downloading assets..."
    curl https://www.spriters-resource.com/download/182270/ -o assets/metroid.png
    curl https://www.spriters-resource.com/download/31615/ -o assets/ship.png

build:
    docker build -t $(PROJECT_NAME) .

run:
    docker-compose up -d

.PHONY: build run