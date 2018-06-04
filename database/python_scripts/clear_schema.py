#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May  8 17:20:33 2018

@author: fredoleary
"""

from platform import python_version
from DBConnection import DBConnection
from DBSchema import DBSchema
from DBClear import DBClear


if __name__ == "__main__":
    print('Python', python_version())

    dbConnection = DBConnection('167.99.229.86', 'dashboard', 'Dashboard2018', 'sema_test1')
    dbConnection.connect()
    connection = dbConnection.get_connection()
    #dbSchema = DBSchema(connection)
    dbClear = DBClear(connection)
    if connection is not None:
        print("Connected")

        dbClear.clear_schema()
        dbConnection.close()
    else:
        print('failed to connect')

