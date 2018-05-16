#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May  8 17:20:33 2018

@author: fredoleary
"""

from platform import python_version
from DBConnection import DBConnection
from DBSchema import DBSchema


if __name__ == "__main__":
    print('Python', python_version())
    
    dbConnection = DBConnection('192.168.50.92', 'fred', 'jibu1', 'jibu1')
    dbConnection.connect()
    connection = dbConnection.get_connection()
    dbSchema = DBSchema(connection)
    if connection is not None:
        print("Connected")
        dbSchema = DBSchema(connection)
        dbSchema.update_schema()
        dbConnection.close()
    else:
        print('failed to connect')

