# Getting Started with BankUserSystem

## Overview
This project is built using Django with Django Rest Framework (DRF) for the backend and React with TypeScript for the frontend. The database used is PostgreSQL. The entire application is containerized using Docker, and Python code is formatted using Black.

## Stack
Backend: Django + DRF
Frontend: React + TypeScript
Database: PostgreSQL

## Getting Started
Follow these instructions to set up and deploy the project locally.

### Prerequisites
Docker installed on your machine


### Installation

1. Clone the Git repository:

```bash
git clone https://github.com/your-username/project.git](https://github.com/liutyinazar/BankUserSystem.git
cd BankUserSystem
```

2. Add the .env file to the backend and frontend folders. Recommended settings are shown in the .env.example file.

3. Build and run the Docker containers:

```bash
docker-compose up --build
```

This will set up the Django backend, React frontend, and PostgreSQL database.

### Access the application:

Backend: http://localhost:8000/

Frontend: http://localhost:3000/

