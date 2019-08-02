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
        category: 'BILLING',
        subcategory: 'Cash Back / Procession Fee / Finance'
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
        subcategory: 'Wants assembly/Dismantling'
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
      value: 'REQUEST_TO_CHANGE_DELIVERY_DATE',
      label: 'Request to Change delivery date',
      crm: {
        type: 'Request',
        category: 'Customer Request',
        subcategory: 'Wants to Reschedule Delivery'
      }
    },
    {
      value: 'REQUEST_TO_CHANGE_INSTALLATION_DATE',
      label: 'Request to Change Installation date',
      crm: {
        type: 'Request',
        category: 'Customer Request',
        subcategory: 'Wants to Reschedule Fitment'
      }
    },
    {
      value: 'REQUEST_FOR_MOBILE_ADDRESS_CHANGE',
      label: 'Request for Mobile / Address change',
      crm: {
        type: 'Request',
        category: 'Customer Request',
        subcategory: 'Update Mobile Number'
      }
    }
  ],
  Complaint: [
    {
      value: 'DELIVERY_OF_PRODUCT_DELAYED',
      label: 'Delivery of product delayed',
      crm: {
        type: 'Complaint',
        category: 'Delivery date Change - Disagree',
        subcategory: 'Stock Not Committed'
      }
    },
    {
      value: 'INSTALLATION_OF_PRODUCT_DELAYED',
      label: 'Installation of product delayed',
      crm: {
        type: 'Complaint',
        category: 'Installation / Fitment Date elapsed',
        subcategory: '48 hour elapsed'
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
        subcategory: 'Some Component / Part Missing'
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
        category: 'Pickup Date Elapsed',
        subcategory: 'Old Product Under Exchange'
      }
    },
    {
      value: 'RETURN_PICKUP',
      label: 'Return pickup',
      crm: {
        type: 'Complaint',
        category: 'Pickup Date Elapsed',
        subcategory: 'Return pickup'
      }
    },
    {
      value: 'INCORRECT_PRICE_BILLED',
      label: 'Incorrect price billed',
      crm: {
        type: 'Complaint',
        category: 'BILLING',
        subcategory: 'Excess Charged / Price Issue'
      }
    },
    {
      value: 'PENDING_REFUND',
      label: 'Pending Refund',
      crm: {
        type: 'Complaint',
        category: 'BILLING',
        subcategory: 'Pending Refund'
      }
    },
    {
      value: 'MODULAR_KITCHEN_DESIGN_AND_BUILD_PROJECT',
      label: 'Modular Kitchen / Design and Build Project',
      crm: {
        type: 'Complaint',
        category: 'Work not completed',
        subcategory: 'Work not completed (DnB/Kitchen)'
      }
    }
  ]
};
export default caseCategories;
