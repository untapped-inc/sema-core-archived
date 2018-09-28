#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May  8 16:29:35 2018

@author: fredoleary
"""
import mysql.connector
import uuid
import logging


class DBReadHaiti:

    def __init__(self, connection ):
        self.connection = connection

    """ Get all countries  """
    def read_countries( self):
        countries = []
        cursor = self.connection.cursor()
        cursor.execute("SELECT name FROM country")
        rows = cursor.fetchall()
        for row in rows:
            countries.append( row[0])

        cursor.close()
        return countries

    """ Get all regions  """
    def read_regions( self):
        regions = []
        cursor = self.connection.cursor()
        cursor.execute("SELECT country_id, name FROM region")
        rows = cursor.fetchall()
        for row in rows:
            cursor2 = self.connection.cursor()
            cursor2.execute("SELECT name FROM country where id = %s", (row[0],))
            countries = cursor2.fetchall()
            regions.append( [countries[0][0], row[1]])
            cursor2.close()

        cursor.close()
        return regions


    """ Get all kiosks  """
    def read_kiosks(self):
        kiosks = []
        cursor = self.connection.cursor()
        cursor.execute("SELECT region_id, name FROM kiosk")
        rows = cursor.fetchall()
        for row in rows:
            cursor2 = self.connection.cursor()
            cursor2.execute("SELECT name FROM region where id = %s", (row[0],))
            regions = cursor2.fetchall()
            kiosks.append([regions[0][0], row[1]])
            cursor2.close()

        cursor.close()
        return kiosks

    """ Get all customerTypes  """
    def read_customer_types( self):
        customer_types = []
        cursor = self.connection.cursor()
        cursor.execute("SELECT name FROM customer_type")
        rows = cursor.fetchall()
        for row in rows:
            customer_types.append( row[0])

        cursor.close()
        return customer_types

    """ Get all sales_channels  """
    def read_sales_channels(self):
        sales_channels = []
        cursor = self.connection.cursor()
        cursor.execute("SELECT name FROM sales_channel")
        rows = cursor.fetchall()
        for row in rows:
            sales_channels.append( row[0])

        cursor.close()
        return sales_channels

    """ Get all customers  """
    def read_customers(self):
        customers = []
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, address, contact_name, customer_type_id, due_amount, gps_coordinates, kiosk_id, "
                       "servicable_customer_base phone_number FROM customer_account")
        rows = cursor.fetchall()
        for row in rows:
            cursor2 = self.connection.cursor()
            cursor2.execute("SELECT name FROM region where id = %s", (row[0],))
            regions = cursor2.fetchall()
            customers.append([regions[0][0], row[1]])
            cursor2.close()

        cursor.close()
        return customers
