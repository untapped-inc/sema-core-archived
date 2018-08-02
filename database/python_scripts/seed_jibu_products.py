#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon July 2 2018

@author: fredoleary
"""



from platform import python_version
from utilities.DBConnection import DBConnection
from utilities.DBPopulate import DBPopulate
from utilities.Product import Product
from dbConfig import dbConfig


import datetime
import base64

if __name__ == "__main__":
    print('Python', python_version())
    imageDir = "jibu_images/"
    f = open("URIs/base64_images.txt")
    URIs = f.readlines()

    products = [  Product(name="1.5L bottle", base64encodedImage="1-5L-water.jpg", category="water_products",
                          description="1.5 Liter water bottle",priceAmount=2600, priceCurrency="UGX",
                          sku="sku1", cogs=1300, updatedDate = datetime.date(2018, 1, 1), quantityPerUnit = 1.5),
                  Product(name="5.0L bottle", base64encodedImage="5L-water.jpg", category="water_products",
                          description="5 Liter water bottle", priceAmount=4000, priceCurrency="UGX",
                          sku="sku2", cogs=2000, updatedDate=datetime.date(2018, 1, 1), quantityPerUnit = 5),
                  Product(name="18.9L jug", base64encodedImage="18-9L-water.jpg", category="water_products",
                          description="18.9 Liter water jug", priceAmount=20000, priceCurrency="UGX",
                          sku="sku3", cogs=10000, updatedDate=datetime.date(2018, 1, 1), quantityPerUnit = 18.9),
                  Product(name="20.0L jug", base64encodedImage="20L-water.jpg", category="water_products",
                          description="20 Liter water jug", priceAmount=25000, priceCurrency="UGX",
                          sku="sku4", cogs=13000, updatedDate=datetime.date(2018, 1, 1), quantityPerUnit = 20)]
    DBConfig = dbConfig()
    dbConnection = DBConnection(DBConfig.host, DBConfig.user, DBConfig.password,DBConfig.dbName)
    dbConnection.connect()
    connection = dbConnection.get_connection()
    if connection is not None:
        print("Connected")
        dbPopulate = DBPopulate(connection)
        dbPopulate.populate_product_category("Water products for Jibu", "water_products")
        for product in products:
            file_name = imageDir + product.base64encodedImage
            with open(file_name, "rb") as image_file:
                base64Image = "data:image/jpeg;base64,".encode('ASCII') + base64.b64encode(image_file.read())

                dbPopulate.populate_product(product.name, base64Image,
                                            product.category, product.description, product.priceAmount,
                                            product.priceCurrency, product.quantityPerUnit, "liters",
                                            product.cogs, product.sku, product.updatedDate);

        dbConnection.close()
    else:
        print('failed to connect')
