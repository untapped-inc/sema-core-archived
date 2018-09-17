const express = require('express');
const router = express.Router();
const semaLog = require('../seama_services/sema_logger');
const bodyParser = require('body-parser');
const Receipt = require('../model_layer/Receipt');

var sqlInsertReceipt = "INSERT INTO receipt " +
				"(id, created_at, updated_at, currency_code, " +
	"customer_account_id, amount_cash, amount_mobile, amount_loan, amount_card, " +
	"kiosk_id, payment_type, sales_channel_id, customer_type_id, total, cogs, uuid )" +
	"VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? )";

var sqlInsertReceiptLineItem = "INSERT INTO receipt_line_item " +
				"(created_at, updated_at, currency_code, price_total, quantity, receipt_id, product_id, cogs_total) " +
				"VALUES (?, ?, ?, ?, ?, ?, ?, ?)";




router.post('/', async (req, res) => {
	semaLog.info('CREATE RECEIPT sema_receipts- Enter');
	req.check("id", "id is missing").exists();
	req.check("currencyCode", "currencyCode is missing").exists();
	req.check("customerId", "customerId is missing").exists();
	req.check("createdDate", "createdDate is missing").exists();
	req.check("siteId", "siteId is missing").exists();
	req.check("paymentType", "paymentType is missing").exists();
	req.check("salesChannelId", "salesChannelId is missing").exists();
	req.check("customerTypeId", "customerTypeId is missing").exists();
	req.check("total", "totalSales is missing").exists();
	req.check("cogs", "cogs is missing").exists();
	req.check("receiptId", "receiptId is missing").exists();
	req.check("products", "products is missing").exists();

	req.getValidationResult().then(function(result) {
		if (!result.isEmpty()) {
			const errors = result.array().map((elem) => {
				return elem.msg;
			});
			semaLog.error("Validation error: " + errors.toString());
			res.status(400).send(errors.toString());
		}else{
			const products = req.body["products"];

			for (let i=0; i < products.length; i++){
				if ( !products[i].productId || !products[i].quantity || !products[i].priceTotal || ! products[i].cogsTotal) {
					semaLog.error("CREATE RECEIPT - Bad request, missing parts of product");
					return res.status(400).send({ msg: "Bad request, missing parts of receipt.product." });
				}
			}

			try {
				let receipt = new Receipt(req.body);

				let postSqlParams = [ receipt.id, receipt.createdDate, receipt.updatedDate,receipt.currencyCode,
					receipt.customerId, receipt.amountCash, receipt.amountMobile, receipt.amountLoan, receipt.amountCard,
					receipt.siteId, receipt.paymentType, receipt.salesChannelId, receipt.customerTypeId, receipt.total, receipt.cogs, receipt.receiptId ];
				insertReceipt(receipt, sqlInsertReceipt, postSqlParams, res);
			} catch(err) {
				semaLog.warn(`sema_receipts - Error: ${err}`);
				return res.status(500).send({ msg: "Internal Server Error" });
			}
		}
	});

});

const insertReceipt = (receipt, query, params, res ) => {
	__pool.getConnection((err, connection) => {
		connection.beginTransaction(function(err) {
			connection.query(query, params, function(err, result) {
				if (err) {
					semaLog.error('insertReceipt- receipts - failed(1)', { err });
					connection.rollback();

						// Use http 'conflict if this is a duplicate
					res.status(err.code === "ER_DUP_ENTRY" ? 409: 500).send(err.message);
					connection.release();
				}
				else {
					semaLog.info('receipts - succeeded');
					if( receipt.products.length === 0 ){
						commitTransaction(receipt, connection, res);
					}else {
						let receiptId = result.insertId;
						let successCount = 0;
						let resolveCount = 0;
						for (let i = 0; i < receipt.products.length; i++) {
							let sqlProductParams = [
								receipt.products[i].createdDate,
								receipt.products[i].updatedDate,
								receipt.products[i].currencyCode,
								receipt.products[i].priceTotal,
								receipt.products[i].quantity,
								receipt.products[i].receiptId,
								receipt.products[i].productId,
								receipt.products[i].cogsTotal
							];
							semaLog.info("Inserting line item #" + i);
							insertReceiptLineItem(sqlInsertReceiptLineItem, sqlProductParams, connection).then(function(result) {
								semaLog.info("Inserted line item #" + resolveCount);
								resolveCount++;
								if (result) {
									successCount++;
								}

								if (resolveCount == receipt.products.length) {
									if (successCount == resolveCount) {
										commitTransaction(receipt, connection, res);
									} else {
										connection.rollback(function() {
											semaLog.error('insertReceipt- receipts - failed(2)', { err });
											res.status(500).send("Error");
											connection.release();
										});
									}
								}
							})
						}
					}
				}
			});
		});
	});
};

const commitTransaction = ( receipt, connection, res) => {
	connection.commit(function(err) {
		if (err) {
			connection.rollback(function() {
				semaLog.error('CommitTransaction- Create receipt - failed', { err });
				res.status(500).send(err.message);
				connection.release();

			});
		} else {
			connection.release();

		}
		try {
			res.json(receipt.classToPlain());
		} catch (err) {
			semaLog.error('CommitTransaction- receipts - failed', { err });
			res.status(500).send(err.message);
		}
		semaLog.info('Receipt Transaction Complete.');

	})
}

const insertReceiptLineItem = (query, params, connection) => {
	return new Promise((resolve, reject) => {
		connection.query(query, params, function(err, result) {
			if (err) {
				semaLog.error('insertReceiptLineItem - Failed, err: ' +err.message);
				resolve(false);
			}
			else {
				semaLog.info('insertReceiptLineItem - succeeded');
				resolve(true);
			}
		});

	});
};

module.exports = router;
