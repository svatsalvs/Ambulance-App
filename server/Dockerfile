# server/Dockerfile

FROM python:3.7.2-alpine

RUN apk update && apk add build-base python-dev py-pip jpeg-dev zlib-dev
RUN apk add --update --no-cache --virtual build-deps gcc python3-dev musl-dev libc-dev linux-headers libxslt-dev libxml2-dev \
&& apk add libffi-dev openssl-dev \
&& pip install --upgrade pip setuptools \
&& apk del build-deps

ENV LIBRARY_PATH=/lib:/usr/lib

WORKDIR /usr/src/app

COPY ./requirements.txt /usr/src/app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /usr/src/app

WORKDIR /usr/src/app/ambulance

RUN python manage.py collectstatic --noinput