FROM python:3.9

MAINTAINER Dmitry Abakumov <killerinshadow2@gmail.com>

COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
COPY ./app /code/app
WORKDIR /code/
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
