#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon July 2 2018

@author: Brian Mackessy
"""

from platform import python_version
from utilities.DBConnection import DBConnection
from utilities.DBPopulate import DBPopulate
from utilities.Product import Product
from dbConfig import dbConfig

import datetime
if __name__ == "__main__":
    print('Python', python_version())
    products = [ Product(active = 0, base64encodedImage="pic1", category="product_category 1",
                          description="Product-1", gallons=10.0, priceAmount=5.0, priceCurrency="Dollars", sku="sku1",
                          updatedDate= datetime.date(2018, 1, 1)),
                  Product(active=0, base64encodedImage="pic1", category="product_category 1",
                          description="Product-2", gallons=10.0,
                          priceAmount=5.0, priceCurrency="Dollars", sku="sku2",
                          updatedDate=datetime.date(2017, 1, 1)),
                  Product(active=0, base64encodedImage="pic1", category="product_category 1",
                          description="Product-3", gallons=10.0,
                          priceAmount=5.0, priceCurrency="Dollars", sku="sku3",
                          updatedDate=datetime.date(2016, 1, 1)),
                  Product(active=0, base64encodedImage="pic1", category="product_category 1",
                          description="Product-4", gallons=10.0,
                          priceAmount=5.0, priceCurrency="Dollars", sku="sku4",
                          updatedDate=datetime.date(2015, 1, 1))
                          ]
    DBConfig = dbConfig()
    dbConnection = DBConnection(DBConfig.host, DBConfig.user, DBConfig.password,DBConfig.dbName)
    dbConnection.connect()
    connection = dbConnection.get_connection()
    if connection is not None:
        print("Connected")
        dbPopulate = DBPopulate(connection)
        dbPopulate.populate_country('New Zealand')
        dbPopulate.populate_customer_type('TestCustomer')
        dbPopulate.populate_sales_channel(0x0, "sales channel 1")
        dbPopulate.populate_product_category("Description of product category", "product_category 1")
        dbPopulate.populate_region('New Zealand', 'Manawatu')
        dbPopulate.populate_kiosk('Manawatu', "UnitTestCustomers", "my_api_key")
        for product in products:
            dbPopulate.populate_product(product.active, product.base64encodedImage,
                                        product.category, product.description, product.gallons, product.priceAmount,
                                        product.priceCurrency, product.sku, product.updatedDate);

        dbConnection.close()
    else:
        print('failed to connect')