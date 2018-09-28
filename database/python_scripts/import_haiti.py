#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thur Sep  20 17:20:33 2018

@author: fredoleary
"""
import pandas as pd

from platform import python_version
from utilities.DBConnection import DBConnection
from utilities.DBPopulate import DBPopulate
from utilities.DBReadHaiti import DBReadHaiti
from utilities.Customer import Customer
from utilities.SalesChannel import SalesChannel
from utilities.CustomerType import CustomerType
from dbConfig import dbConfig
from utilities.Product import Product
from swn_xls_record import swnXlsRecord

import datetime
import random
import time
import math
import decimal
import json

from enum import Enum


def getSalesChannel( salesChannels):
    keys = list(salesChannels.keys())
    index =  random.randint( 0, len(keys )-1)
    return salesChannels[keys[index]]


def importHaitDb( dbPopulate, dbReadHaiti):
    countries = dbReadHaiti.read_countries()
    for country in countries.values():
        dbPopulate.populate_country(country)
    regions = dbReadHaiti.read_regions( countries )
    for region in regions.values():
        dbPopulate.populate_region( region['country'], region['name'], "description")

    kiosks = dbReadHaiti.read_kiosks(regions)
    for kiosk in kiosks.values():
        dbPopulate.populate_kiosk( kiosk['region'], kiosk['name'])

    customer_types = dbReadHaiti.read_customer_types()
    for customer_type in customer_types.values():
        dbPopulate.populate_customer_type( customer_type)

    sales_channels = dbReadHaiti.read_sales_channels()

    for sales_channel in sales_channels.values():
        dbPopulate.populate_sales_channel( False,  sales_channel)

    customers = dbReadHaiti.read_customers()
    for customer in customers.values():
        newCustomer = {"id":customer['id'],"address":customer['address'], "name":customer['contact_name'],
                       "customerType":customer_types[customer['customer_type_id']], "amountDue": customer['due_amount'],
                       "gpsCoordinates":customer['gps_coordinates'], "kiosk":kiosks[customer['kiosk_id']]['name'],
                       "phoneNumber":customer['phone_number'], "active": customer['active'],
                       "servicableCustomerBase": customer['servicable_customer_base']}
        phoneNumber = newCustomer['phoneNumber']
        if phoneNumber == None:
            phoneNumber = "555-1212"
        salesChannel = getSalesChannel(sales_channels)

        # dbPopulate.populate_customer_swn(newCustomer['kiosk'], newCustomer['customerType'], salesChannel, newCustomer['name'],
        #                                  createUpdateDate, createUpdateDate, phoneNumber, getIncome(), getGender(),
        #                                  getDistance())

        print( json.dumps(newCustomer, indent=1))


if __name__ == "__main__":
    print('Python', python_version())


    DBConfig = dbConfig()
    dbConnection = DBConnection(DBConfig.host, DBConfig.user, DBConfig.password,DBConfig.dbName)
    dbConnection.connect()
    connection = dbConnection.get_connection()
    dbConnectionHaiti = DBConnection(DBConfig.host, DBConfig.user, DBConfig.password,"sema")
    dbConnectionHaiti.connect()
    connectionHaiti = dbConnectionHaiti.get_connection()
    if connection is not None and connectionHaiti is not None:
        print("Connected")

        cursor = connection.cursor()
        cursor.execute("select database()")
        db_name = cursor.fetchone()[0]


        # Verify you are connected to a sample database
        if "sample" in db_name.lower():
            dbPopulate = DBPopulate(connection)
            dbReadHaiti = DBReadHaiti(connectionHaiti )
            importHaitDb( dbPopulate, dbReadHaiti)

        else:
            print("You are not connected to a 'sample' database")
        dbConnection.close()
    else:
        print('failed to connect')

