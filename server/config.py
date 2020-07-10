import os


class Config:
    MYSQL_USER = os.environ['MYSQL_USER']
    MYSQL_PASSWORD = os.environ['MYSQL_PASSWORD']
    MYSQL_DB = os.environ['MYSQL_DB']
    MYSQL_CURSORCLASS = os.environ['MYSQL_CURSORCLASS']


config = Config
