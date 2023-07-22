# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

Before proceeding, make sure you have the following installed on your system:

1. Docker: Install Docker

### Docker Build and Run Steps

Follow these steps to build and run the Docker image for the Product List App:

1. Clone this repository:

#### git clone <repository_url>
#### cd <repository_name>

1.Build the Docker image:

#### docker build -t my_react_app .

1. Run the Docker container:

#### docker run -p 80:80 my_react_app

Open [http://localhost:80](http://localhost:80) to view it in your browser.
