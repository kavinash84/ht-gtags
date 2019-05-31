const caseSubCategories = {
  INVOICE_COPY: [],
  ABOUT_CASHBACK_FINANCE_EMI: [],
  VOUCHER_COUPON_SUPPORT: [],
  SERVICE_STAFF_PRODUCT_FEEDBACK: [
    {
      value: 'Delivery person Feedback',
      label: 'Delivery person Feedback',
      crm: {
        type: 'Request',
        category: 'BEHAVIOUR',
        subcategory: 'Delivery Person'
      }
    },
    {
      value: 'Technician / Fitter Feedback',
      label: 'Technician / Fitter Feedback',
      crm: {
        type: 'Request',
        category: 'BEHAVIOUR',
        subcategory: 'Fitter /Technician'
      }
    },
    {
      value: 'Contact center Feedback',
      label: 'Contact center Feedback',
      crm: {
        type: 'Request',
        category: 'BEHAVIOUR',
        subcategory: 'Call Center Agent'
      }
    },
    {
      value: 'Store / Store Staff Feedback',
      label: 'Store / Store Staff Feedback',
      crm: {
        type: 'Request',
        category: 'BEHAVIOUR',
        subcategory: 'Store Staff'
      }
    },
    {
      value: 'Website Feedback',
      label: 'Website Feedback',
      crm: {
        type: 'Request',
        category: 'BEHAVIOUR',
        subcategory: 'Website'
      }
    }
  ],
  SERVICE_REQUEST_WITHIN_WARRANTY: [
    {
      value: 'Product Alignment / Loosening /  Shaking',
      label: 'Product Alignment / Loosening /  Shaking',
      crm: {
        type: 'Complaint',
        category: 'Service Request - Under warranty',
        subcategory: 'Loose / Align / Laser / Polish'
      }
    },
    {
      value: 'Stitches coming out / Sagging / Peel off',
      label: 'Stitches coming out / Sagging / Peel off',
      crm: {
        type: 'Complaint',
        category: 'Service Request - Under warranty',
        subcategory: 'Fabric - Sagging / Stitches coming out /Peel off'
      }
    },
    {
      value: 'Fungus / Termite',
      label: 'Fungus / Termite',
      crm: {
        type: 'Complaint',
        category: 'Service Request - Under warranty',
        subcategory: 'Fungus / Termite'
      }
    },
    {
      value: 'Crack / Bend / Breakage',
      label: 'Crack / Bend / Breakage',
      crm: {
        type: 'Complaint',
        category: 'Service Request - Under warranty',
        subcategory: 'Crack / Bend / Breakage / Peel Off'
      }
    },
    {
      value: 'Rusting',
      label: 'Rusting',
      crm: {
        type: 'Complaint',
        category: 'Service Request - Under warranty',
        subcategory: 'Rusting'
      }
    },
    {
      value: 'Part / Componant / Mechanism Not Working',
      label: 'Part / Componant / Mechanism Not Working',
      crm: {
        type: 'Complaint',
        category: 'Service Request - Under warranty',
        subcategory: 'Part Not Working'
      }
    }
  ],
  SERVICE_REQUEST_AFTER_WARRANTY: [
    {
      value: 'Product Alignment / Loosening /  Shaking',
      label: 'Product Alignment / Loosening /  Shaking',
      crm: {
        type: 'Complaint',
        category: 'Service Request - After warranty',
        subcategory: 'Loose / Align / Laser / Polish'
      }
    },
    {
      value: 'Stitches coming out / Sagging / Peel off',
      label: 'Stitches coming out / Sagging / Peel off',
      crm: {
        type: 'Complaint',
        category: 'Service Request - After warranty',
        subcategory: 'Fabric - Sagging / Stitches coming out /Peel off'
      }
    },
    {
      value: 'Fungus / Termite',
      label: 'Fungus / Termite',
      crm: {
        type: 'Complaint',
        category: 'Service Request - After warranty',
        subcategory: 'Fungus / Termite'
      }
    },
    {
      value: 'Crack / Bend / Breakage',
      label: 'Crack / Bend / Breakage',
      crm: {
        type: 'Complaint',
        category: 'Service Request - After warranty',
        subcategory: 'Crack / Bend / Breakage / Peel Off'
      }
    },
    {
      value: 'Rusting',
      label: 'Rusting',
      crm: {
        type: 'Complaint',
        category: 'Service Request - After warranty',
        subcategory: 'Rusting'
      }
    },
    {
      value: 'Part / Componant / Mechanism Not Working',
      label: 'Part / Componant / Mechanism Not Working',
      crm: {
        type: 'Complaint',
        category: 'Service Request - After warranty',
        subcategory: 'Part Not Working'
      }
    }
  ],
  PRODUCT_DISMANTLING_RE_ASSEMBLY_SUPPORT: [],
  FREE_SERVICE_CAMP_REGISTRATION: [],
  CHANGE_DELIVERY_DATE: [],
  CHANGE_INSTALLATION_DATE: [],
  DELIVERY_OF_PRODUCT_DELAYED: [],
  INSTALLATION_OF_PRODUCT_DELAYED: [],

  DELIVERED_PRODUCT_DOES_NOT_MATCH: [
    {
      value: 'Incorrect Colour / Specification',
      label: 'Incorrect Colour / Specification',
      crm: {
        type: 'Complaint',
        category: 'Wrong Material Delivered',
        subcategory: 'Wrong Colour / Specification'
      }
    },
    {
      value: 'Incorrect product',
      label: 'Incorrect product',
      crm: {
        type: 'Complaint',
        category: 'Wrong Material Delivered',
        subcategory: 'Wrong product delivered'
      }
    },
    {
      value: 'Incorrect package',
      label: 'Incorrect package',
      crm: {
        type: 'Complaint',
        category: 'Wrong Material Delivered',
        subcategory: 'Incorrect / Incomplete package'
      }
    }
  ],
  MISSING_COMPONANT: [],
  RECEIVED_PRODUCT_WITH_DAMAGE: [
    {
      value: 'Chip Off / Scratches',
      label: 'Chip Off / Scratches',
      crm: {
        type: 'Complaint',
        category: 'Damaged Material Delivered',
        subcategory: 'Chip Off / Scratches'
      }
    },
    {
      value: 'Crack / Breakage /Bend',
      label: 'Crack / Breakage /Bend',
      crm: {
        type: 'Complaint',
        category: 'Damaged Material Delivered',
        subcategory: 'Crack / Breakage /Bend'
      }
    },
    {
      value: 'Dusty / Dirty Product',
      label: 'Dusty / Dirty Product',
      crm: {
        type: 'Complaint',
        category: 'Damaged Material Delivered',
        subcategory: 'Dusty / Dirty Product'
      }
    },
    {
      value: 'Glass /Mirror Broken',
      label: 'Glass /Mirror Broken',
      crm: {
        type: 'Complaint',
        category: 'Damaged Material Delivered',
        subcategory: 'Glass /Mirror Broken'
      }
    },
    {
      value: 'Marble Damage',
      label: 'Marble Damage',
      crm: {
        type: 'Complaint',
        category: 'Damaged Material Delivered',
        subcategory: 'Marble Damage'
      }
    },
    {
      value: 'Tear / Open Stitches',
      label: 'Tear / Open Stitches',
      crm: {
        type: 'Complaint',
        category: 'Damaged Material Delivered',
        subcategory: 'Tear / Open Stitches'
      }
    }
  ],
  RECEIVED_PRODUCT_WITH_DEFECT: [
    {
      value: 'Mechanism not working',
      label: 'Mechanism not working',
      crm: {
        type: 'Complaint',
        category: 'Defective Material Delivered',
        subcategory: 'Mechanism not working'
      }
    },
    {
      value: 'Lamination issue',
      label: 'Lamination issue',
      crm: {
        type: 'Complaint',
        category: 'Defective Material Delivered',
        subcategory: 'chromium plating / lamination / lazer issue'
      }
    },
    {
      value: 'other manufacturing defect',
      label: 'other manufacturing defect',
      crm: {
        type: 'Complaint',
        category: 'Defective Material Delivered',
        subcategory: 'other manufacturing defect'
      }
    },
    {
      value: 'Color variance in product',
      label: 'Color variance in product',
      crm: {
        type: 'Complaint',
        category: 'Defective Material Delivered',
        subcategory: 'colour variance in product'
      }
    },
    {
      value: 'Unable to complete assembly',
      label: 'Unable to complete assembly',
      crm: {
        type: 'Complaint',
        category: 'Defective Material Delivered',
        subcategory: 'Size mismatch / groove mismatch'
      }
    }
  ],
  PICKUP_DURING_EXCHANGE_OFFER_DELAYED: [],
  RETURN_PICKUP: [],
  INCORRECT_PRICE_BILLED: [],
  PENDING_REFUND: []
};
export default caseSubCategories;
