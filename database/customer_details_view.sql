CREATE VIEW `customer_details` AS
    SELECT 
		customer_account.active,
        customer_account.created_at,
        customer_account.name as customer_name,
        customer_account.income_level,
        customer_account.gender,
        kiosk.name as kiosk_name,
        kiosk.id as kiosk_id,
		kiosk.consumer_base
   FROM
        sema_swn_core.customer_account
            INNER JOIN
        sema_swn_core.kiosk ON customer_account.kiosk_id = kiosk.id
