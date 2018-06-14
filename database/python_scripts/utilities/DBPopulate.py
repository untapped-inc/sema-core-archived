#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May  8 16:29:35 2018

@author: fredoleary
"""
import mysql.connector
import uuid
import logging


class DBPopulate:

    def __init__(self, connection ):
        self.connection = connection

    """ Add a country  """
    def populate_country( self, country):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM country WHERE name = %s", (country,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("INSERT INTO country (version, name) VALUES(%s, %s)", (1, country))
                self.connection.commit()
                print(country, 'added')
            except mysql.connector.Error as err:
                print('failed to add', country, err)
        else:
            print('Country', country, 'exists')
        cursor.close()

    """ Add a customer type  """
    def populate_customer_type( self, name):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM customer_type WHERE name = %s", (name,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("INSERT INTO customer_type (version, name) VALUES(%s, %s)", (1, name))
                self.connection.commit()
                print('Customer type', name, 'added')
            except mysql.connector.Error as err:
                print('failed to add', name, err)
        else:
            print('Customer type', name, 'exists')
        cursor.close()

    """ Add a region  """
    def populate_region(self, country, region):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM region WHERE name = %s", (region,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("SELECT * FROM country WHERE name = %s", (country,))
                rows = cursor.fetchall()
                cursor.execute("INSERT INTO region (version, country_id, name) VALUES(%s,%s, %s)", (1, rows[0][0], region) )
                self.connection.commit()
                print(region, 'added')
            except mysql.connector.Error as err:
                print('failed to add region', region, err)
        else:
            print('Region', region, 'exists')
        cursor.close()

    """ Add a kiosk  """
    def populate_kiosk(self, region_name, kiosk_name, api_key ):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM kiosk WHERE name = %s", (kiosk_name,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("SELECT * FROM region WHERE name = %s", (region_name,))
                rows = cursor.fetchall()
                cursor.execute("INSERT INTO kiosk (version, region_id, name, api_key) VALUES(%s,%s, %s, %s)", (1, rows[0][0], kiosk_name, api_key))
                self.connection.commit()
                print(kiosk_name, 'added')
            except mysql.connector.Error as err:
                print('failed to add kiosk', kiosk_name, err)
        else:
            print('Kiosk', kiosk_name, 'exists')
        cursor.close()

    """ Add a customer. Note: This assumes contact_name are unique """

    def populate_customer(self, kiosk_name, customer_type, contact_name, create_date, updated_date):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM customer_account WHERE contact_name = %s", (contact_name,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                guid = str(uuid.uuid1())

                cursor.execute("SELECT * FROM kiosk WHERE name = %s", (kiosk_name,))
                kiosk_rows = cursor.fetchall()
                cursor.execute("SELECT * FROM customer_type WHERE name = %s", (customer_type,))
                ct_rows = cursor.fetchall()

                cursor.execute("INSERT INTO customer_account "
                               "(version, id, kiosk_id, contact_name, due_amount, customer_type_id, created_date, updated_date) "
                               "VALUES(%s, %s, %s, %s, %s, %s, %s, %s)",
                               (1, guid, kiosk_rows[0][0], contact_name, 0, ct_rows[0][0], create_date, updated_date))
                self.connection.commit()
                print("Customer", contact_name, 'added')
            except mysql.connector.Error as err:
                print('failed to add kiosk', kiosk_name, err)
        else:
            print('Contact_name', contact_name, 'exists')
        cursor.close()

    """ Add a product category  """
    def populate_product_category( self, description, name):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM product_category WHERE name = %s", (name,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("INSERT INTO product_category (version, name, description) VALUES(%s, %s, %s)", (1, name, description))
                self.connection.commit()
                print('product category', name, 'added')
            except mysql.connector.Error as err:
                print('failed to add', name, err)
        else:
            print('product category', name, 'exists')
        cursor.close()

    """ Add a product. Note: This assumes product descriptions are unique """
    def populate_product(self, active, encoded_image, category, description, gallons, price, currency, sku):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM product WHERE description = %s", (description,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:

                cursor.execute("SELECT * FROM product_category WHERE name = %s", (category,))
                found_rows = cursor.fetchall()

                cursor.execute("INSERT INTO product "
                               "(version, active, base64encoded_image, category_id, description, gallons, price_amount, price_currency, sku) "
                               "VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                               (1, active, encoded_image, found_rows[0][0], description, gallons, price, currency, sku))
                self.connection.commit()
                print("Product", description, 'added')
            except mysql.connector.Error as err:
                print('failed to add product', description, err)
        else:
            print('Product "',description,'" exists')
        cursor.close()

    """ Add a sales channel  """
    def populate_sales_channel( self, delayed_delivery, name):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM sales_channel WHERE name = %s", (name,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("INSERT INTO sales_channel (version, delayed_delivery, name ) VALUES(%s, %s, %s)",
                               (1, delayed_delivery, name))
                self.connection.commit()
                print('sales channel', name, 'added')
            except mysql.connector.Error as err:
                print('failed to add', name, err)
        else:
            print('sales channel "', name, '" exists')
        cursor.close()


    """ Add a receipt. Note: This assumes recipts have unique date and time """
    def populate_receipt(self, created_date, currency, customer_ref,customer_amount, is_sponsor_selected,
                         kiosk_ref, payment_mode, payment_type, sales_channel_ref, total, total_gallons):

        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM receipt WHERE created_date = %s", (created_date,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:

                cursor.execute("SELECT * FROM kiosk WHERE name = %s", (kiosk_ref,))
                found_rows = cursor.fetchall()
                kiosk_id = found_rows[0][0]

                cursor.execute("SELECT * FROM customer_account WHERE contact_name = %s", (customer_ref,))
                found_rows = cursor.fetchall()
                customer_id = found_rows[0][0]

                cursor.execute("SELECT * FROM sales_channel WHERE name = %s", (sales_channel_ref,))
                found_rows = cursor.fetchall()
                sales_channel_id = found_rows[0][0]
                try:
                    cursor.execute("INSERT INTO receipt "
                                   "( version, is_sponsor_selected, created_date, currency_code, "
                                   "customer_account_id, customer_amount, payment_mode, kiosk_id, "
                                   "payment_type, sales_channel_id, total, total_gallons )"
                                 
                                   " VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                                   (1, is_sponsor_selected, created_date, currency, customer_id,
                                    customer_amount, payment_mode, kiosk_id, payment_type,
                                    sales_channel_id, total, total_gallons))
                except Exception as e:
                    print( e.message)

                self.connection.commit()
                print("Receipt", created_date, 'added')
            except mysql.connector.Error as err:
                print('failed to add receipt for', created_date, err)
        else:
            print('Receipt for "',created_date,'" exists')
        cursor.close()

    """ Add a parameter """
    def populate_parameter( self, name):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM parameter WHERE name = %s", (name,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute("INSERT INTO parameter (version, name, active, is_ok_not_ok, is_used_in_totalizer, manual)"
                               " VALUES(%s, %s, %s, %s, %s, %s)", (1, name, 0x1, 0x0, 0x0, 0x0 ))
                self.connection.commit()
                print('parameter "', name, '" added')
            except mysql.connector.Error as err:
                print('failed to add', name, err)
        else:
            print('parameter "', name, '" exists')
        cursor.close()

    """ Add a sampling site """
    def populate_sampling_site( self, name):
        cursor = self.connection.cursor()
        cursor.execute("SELECT * FROM sampling_site WHERE name = %s", (name,))
        rows = cursor.fetchall()
        if len(rows) == 0:
            try:
                cursor.execute(
                    "INSERT INTO sampling_site (version, is_used_for_totalizer, name)"
                    " VALUES(%s, %s, %s)", (1, 0x0, name))
                self.connection.commit()
                print('sampling_site "', name, '" added')
            except mysql.connector.Error as err:
                print('failed to add', name, err)
        else:
            print('sampling_site "', name, '" exists')
        cursor.close()

    """ Add a reading and measurement with sampling site"""
    def populate_reading_and_measurement( self, kiosk_ref, created_date, sampling_site_ref, parameter_ref, value):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT id FROM kiosk WHERE name = %s", (kiosk_ref,))
            found_rows = cursor.fetchall()
            kiosk_id = found_rows[0][0]

            cursor.execute("SELECT id FROM sampling_site WHERE name = %s", (sampling_site_ref,))
            found_rows = cursor.fetchall()
            sampling_site_id = found_rows[0][0]

            cursor.execute("SELECT id FROM parameter WHERE name = %s", (parameter_ref,))
            found_rows = cursor.fetchall()
            parameter_id = found_rows[0][0]

            cursor.execute("SELECT * FROM reading WHERE kiosk_id = %s AND "
                           "created_date= %s AND sampling_site_id = %s" ,
                           (kiosk_id, created_date, sampling_site_id))
            found_rows = cursor.fetchall()
            if len(found_rows) == 0:
                cursor.execute("INSERT INTO reading (version, created_date, kiosk_id, sampling_site_id) "
                               "VALUES(%s, %s, %s, %s )", (1, created_date, kiosk_id, sampling_site_id))
                self.connection.commit()
                print('Added reading for date', created_date, '. Kiosk', kiosk_ref, '. Sampling site:', sampling_site_ref)

                cursor.execute("SELECT id FROM reading WHERE kiosk_id = %s AND "
                               "created_date= %s AND sampling_site_id = %s" ,
                               (kiosk_id, created_date, sampling_site_id))
                found_rows = cursor.fetchall()
                reading_id = found_rows[0][0]

                cursor.execute("INSERT INTO measurement (version, parameter_id, reading_id, value) "
                               "VALUES(%s, %s, %s, %s )", (1, parameter_id, reading_id, value))
                self.connection.commit()
                print('Added measurement for parameter', parameter_ref )



            else:
                print('Reading for date', created_date,'. Kiosk', kiosk_ref, '. Sampling site:', sampling_site_ref, 'exists')


        except mysql.connector.Error as err:
            print('failed to add reading/measurement for ', created_date, err)
        cursor.close()

    """ Add a reading and measurement no sampling site"""
    def populate_reading_and_measurement_no_sampling_site( self, kiosk_ref, created_date, parameter_ref, value):
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT id FROM kiosk WHERE name = %s", (kiosk_ref,))
            found_rows = cursor.fetchall()
            kiosk_id = found_rows[0][0]

            cursor.execute("SELECT id FROM parameter WHERE name = %s", (parameter_ref,))
            found_rows = cursor.fetchall()
            parameter_id = found_rows[0][0]

            cursor.execute("SELECT * FROM reading WHERE kiosk_id = %s AND "
                           "created_date= %s ", (kiosk_id, created_date ))
            found_rows = cursor.fetchall()
            if len(found_rows) == 0:
                cursor.execute("INSERT INTO reading (version, created_date, kiosk_id) "
                               "VALUES(%s, %s, %s)", (1, created_date, kiosk_id))
                self.connection.commit()
                print('Added reading for date', created_date, '. Kiosk', kiosk_ref)

                cursor.execute("SELECT id FROM reading WHERE kiosk_id = %s AND "
                               "created_date= %s " ,
                               (kiosk_id, created_date))
                found_rows = cursor.fetchall()
                reading_id = found_rows[0][0]

                cursor.execute("INSERT INTO measurement (version, parameter_id, reading_id, value) "
                               "VALUES(%s, %s, %s, %s )", (1, parameter_id, reading_id, value))
                self.connection.commit()
                print('Added measurement for parameter', parameter_ref )



            else:
                print('Reading for date', created_date,'. Kiosk', kiosk_ref, '. Sampling site:', 'exists')


        except mysql.connector.Error as err:
            print('failed to add reading/measurement for ', created_date, err)
        cursor.close()


