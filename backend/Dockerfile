FROM python:3.9.1-buster

WORKDIR /app

COPY backend/ /app
RUN pip install -r requirements.txt


COPY docker-compose/backend/entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh