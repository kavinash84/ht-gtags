const caseCategories = {
  Request: [
    {
      value: 'INVOICE_COPY',
      label: 'Invoice Copy',
      crm: {
        type: 'Request',
        category: 'Customer Request',
        subcategory: 'Wants Duplicate Bill'
      }
    },
    {
      value: 'ABOUT_CASHBACK_FINANCE_EMI',
      label: 'About Cashback/Finance/EMI',
      crm: {
        type: 'Complaint',
        category: 'Billing',
        subcategory: 'Cashback/Processing fees / Finance'
      }
    },
    {
      value: 'VOUCHER_COUPON_SUPPORT',
      label: 'Voucher/Coupon support',
      crm: {
        type: 'Request',
        category: 'Gift Voucher',
        subcategory: 'Unable to Redeem'
      }
    },
    {
      value: 'SERVICE_STAFF_PRODUCT_FEEDBACK',
      label: 'Service/Staff/Product Feedback'
    },
    {
      value: 'SERVICE_REQUEST_WITHIN_WARRANTY',
      label: 'Service Request-Within Warranty'
    },
    {
      value: 'SERVICE_REQUEST_AFTER_WARRANTY',
      label: 'Service Request-After Warranty'
    },
    {
      value: 'PRODUCT_DISMANTLING_RE_ASSEMBLY_SUPPORT',
      label: 'Product Dismantling/Re-Assembly support',
      crm: {
        type: 'Request',
        category: 'Customer Request',
        subcategory: 'Wants assembly / dismantling'
      }
    },
    {
      value: 'FREE_SERVICE_CAMP_REGISTRATION',
      label: 'Free Service camp registration',
      crm: {
        type: 'Request',
        category: 'Registration for Service Camp',
        subcategory: 'Furniture'
      }
    },
    {
      value: 'CHANGE_DELIVERY_DATE',
      label: 'Change delivery date',
      crm: {
        type: 'Request',
        category: 'Customer Request',
        subcategory: 'Wants to reschedule Delivery'
      }
    },
    {
      value: 'CHANGE_INSTALLATION_DATE',
      label: 'Change Installation date',
      crm: {
        type: 'Request',
        category: 'Customer Request',
        subcategory: 'Wants to reschedule Fitment'
      }
    }
  ],
  Complaint: [
    {
      value: 'DELIVERY_OF_PRODUCT_DELAYED',
      label: 'Delivery of product delayed',
      crm: {
        type: 'Complaint',
        category: 'Delivery date change - Disagree',
        subcategory: 'Stock not committed'
      }
    },
    {
      value: 'INSTALLATION_OF_PRODUCT_DELAYED',
      label: 'Installation of product delayed',
      crm: {
        type: 'Complaint',
        category: 'Installation / Fitment Date elapsed',
        subcategory: '48hrs elapsed'
      }
    },
    {
      value: 'DELIVERED_PRODUCT_DOES_NOT_MATCH',
      label: 'Delivered product doesn’t match with the specification'
    },
    {
      value: 'MISSING_COMPONANT',
      label: 'Missing componant in the product',
      crm: {
        type: 'Complaint',
        category: 'Hardware parts missing',
        subcategory: 'Some Componant / part missing'
      }
    },
    {
      value: 'RECEIVED_PRODUCT_WITH_DAMAGE',
      label: 'Received product with damage'
    },
    {
      value: 'RECEIVED_PRODUCT_WITH_DEFECT',
      label: 'Received product with defect'
    },
    {
      value: 'PICKUP_DURING_EXCHANGE_OFFER_DELAYED',
      label: 'Pickup during exchange offer delayed',
      crm: {
        type: 'Complaint',
        category: 'pickup date elapsed',
        subcategory: 'old product under exchange'
      }
    },
    {
      value: 'RETURN_PICKUP',
      label: 'Return pickup',
      crm: {
        type: 'Complaint',
        category: 'pickup date elapsed',
        subcategory: 'Return pickup'
      }
    },
    {
      value: 'INCORRECT_PRICE_BILLED',
      label: 'Incorrect price billed',
      crm: {
        type: 'Complaint',
        category: 'BILLING',
        subcategory: 'excess charged / price issue'
      }
    },
    {
      value: 'PENDING_REFUND',
      label: 'Pending Refund',
      crm: {
        type: 'Complaint',
        category: 'BILLING',
        subcategory: 'pending refund'
      }
    }
  ]
};
export default caseCategories;
