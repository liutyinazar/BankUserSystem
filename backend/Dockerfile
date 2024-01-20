FROM python

WORKDIR /app

COPY backend/ /app
RUN pip install --no-cache-dir -r requirements.txt


COPY backend/entrypoint.sh /
RUN chmod +x /entrypoint.sh

ENTRYPOINT /entrypoint.sh