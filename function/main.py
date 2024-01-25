import flask
import functions_framework
import os
import requests
import smtplib
import ssl
from datetime import datetime
from email.mime.text import MIMEText


def get_reservations():
    api = os.environ.get('BACKEND_URL', '').strip()
    response = requests.get(api + '/reservations/today')
    if response.status_code != 200:
        return []
    reservations = response.json()
    return reservations


@functions_framework.http
def send_email(request: flask.Request) -> flask.typing.ResponseReturnValue:
    sender = os.environ.get('SENDER_MAIL', '').strip()
    password = os.environ.get('SENDER_PASSWORD', '').strip()
    recipient = os.environ.get('RECIPIENT_MAIL', '').strip()

    reservations = get_reservations()
    body = ''
    if len(reservations) == 0:
        body = 'No reservations today'
    else:
        for reservation in reservations:
            start_time = datetime.fromisoformat(reservation['startTime']).strftime("%d %b %Y, %H:%M")
            end_time = datetime.fromisoformat(reservation['endTime']).strftime("%d %b %Y, %H:%M")
            body += (f'Room {reservation["roomName"]} (reserved by {reservation["user"]["username"]} '
                     f'from {start_time} to {end_time})\n')

    message = MIMEText(body)
    message['Subject'] = "Today's reservations"
    message['From'] = sender
    message['To'] = recipient

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=ssl.create_default_context()) as server:
            server.login(sender, password)
            server.sendmail(sender, recipient, message.as_string())
    except Exception as e:
        print(e)
        return str(e)

    return 'Email sent'
