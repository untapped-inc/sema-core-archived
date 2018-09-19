CREATE VIEW `receipt_details` AS
    SELECT 
        receipt_line_item.created_at,
        receipt_line_item.quantity,
        receipt_line_item.product_id,
        receipt_line_item.receipt_id,
        receipt.sales_channel_id,
        receipt.kiosk_id,
        receipt.amount_cash,
		product.unit_per_product,
        receipt_line_item.quantity * product.unit_per_product AS volume,
        customer_account.name,
        customer_account.income_level,
        customer_account.customer_type_id
    FROM
        sema_swn_core.receipt_line_item
            INNER JOIN
        sema_swn_core.receipt ON receipt_line_item.receipt_id = receipt.id
            INNER JOIN
        sema_swn_core.product ON receipt_line_item.product_id = product.id
            INNER JOIN
        sema_swn_core.customer_account ON receipt.customer_account_id = customer_account.id;
