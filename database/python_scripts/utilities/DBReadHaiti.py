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
        countries = {}
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, name FROM country")
        rows = cursor.fetchall()
        for row in rows:
            countries[row[0]] = row[1]
        cursor.close()
        return countries

    """ Get all regions  """
    def read_regions( self, countries):
        regions = {}
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, name, country_id FROM region")
        rows = cursor.fetchall()
        for row in rows:
            regions[row[0]] = {"name":row[1], "country":countries[row[2]]}

        cursor.close()
        return regions


    """ Get all kiosks  """
    def read_kiosks(self, regions):
        kiosks = {}
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, name, region_id FROM kiosk")
        rows = cursor.fetchall()
        for row in rows:
            kiosks[row[0]] = {"name": row[1], "region": regions[row[2]]}
        cursor.close()
        return kiosks

    """ Get all customerTypes  """
    def read_customer_types( self):
        customer_types = {}
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, name FROM customer_type")
        rows = cursor.fetchall()
        for row in rows:
            customer_types[row[0]] = row[1]
        cursor.close()
        return customer_types

    """ Get all sales_channels  """
    def read_sales_channels(self):
        sales_channels = {}
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, name FROM sales_channel")
        rows = cursor.fetchall()
        for row in rows:
             sales_channels[row[0]] = row[1]

        cursor.close()
        return sales_channels

    """ Get all customers  """
    def read_customers(self):
        customers = {}
        cursor = self.connection.cursor()
        cursor.execute("SELECT id, address, contact_name, customer_type_id, due_amount, gps_coordinates, kiosk_id," 
                       "phone_number, active, serviceable_customer_base FROM customer_account")
        rows = cursor.fetchall()
        for row in rows:
            customers[row[0]] = {"id":row[0], "address": row[1], "contact_name": row[2], "customer_type_id":row[3],
                                 "due_amount":row[4], "gps_coordinates":row[5], "kiosk_id":row[6], "phone_number":row[7],
                                 "active":row[8], "servicable_customer_base":row[9]}

        cursor.close()
        return customers
