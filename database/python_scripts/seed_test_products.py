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
    f = open("URIs/base64_images.txt")
    URIs = f.readlines()

    products = [  Product(name="product 1", base64encodedImage=URIs[0], category="product_category 1",
                          description="Description Product-1",priceAmount=5.0, priceCurrency="USD",
                          sku="sku1", cogs=4.0, updatedDate = datetime.date(2018, 1, 1)),
                  Product(name="product 2", base64encodedImage=URIs[1], category="product_category 1",
                          description="Description Product-2",priceAmount=5.0, priceCurrency="USD",
                          sku="sku2", cogs=4.6, updatedDate = datetime.date(2017, 1, 1)),
                  Product(name="product 3", base64encodedImage=URIs[2], category="product_category 1",
                          description="Description Product-3",priceAmount=5.0, priceCurrency="USD",
                          sku="sku3", cogs=3.5, updatedDate = datetime.date(2016, 1, 1)),
                  Product(name="product 4", base64encodedImage=URIs[3], category="product_category 1",
                          description="Description Product-4",priceAmount=5.0, priceCurrency="USD",
                          sku="sku4", cogs=4.5, updatedDate = datetime.date(2015, 1, 1))]
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
        dbPopulate.populate_region('New Zealand', 'Manawatu', "My home town!")
        dbPopulate.populate_kiosk('Manawatu', "UnitTestCustomers")
        for product in products:
            dbPopulate.populate_product(product.name, product.base64encodedImage,
                                        product.category, product.description, product.priceAmount,
                                        product.priceCurrency, 1,"tons", product.cogs, product.sku, product.updatedDate);

        dbConnection.close()
    else:
        print('failed to connect')
