const caseReverseMapping = {
  'Customer Request-Wants Duplicate Bill': {
    cat: 'Invoice Copy',
    subcat: ''
  },
  'BILLING-Cash Back / Procession Fee / Finance': {
    cat: 'About Cashback/ Finance / EMI ',
    subcat: ''
  },
  'Gift Voucher-Unable to Redeem': {
    cat: 'Voucher / Coupon support',
    subcat: ''
  },
  'BEHAVIOUR-Delivery Person': {
    cat: 'Service / Staff / Product Feedback',
    subcat: 'Delivery person Feedback'
  },
  'BEHAVIOUR-Fitter /Technician': {
    cat: 'Service / Staff / Product Feedback',
    subcat: 'Technician / Fitter Feedback'
  },
  'BEHAVIOUR-Call Center Agent': {
    cat: 'Service / Staff / Product Feedback',
    subcat: 'Contact center Feedback'
  },
  'BEHAVIOUR-Store Staff': {
    cat: 'Service / Staff / Product Feedback',
    subcat: 'Store / Store Staff Feedback'
  },
  'BEHAVIOUR-Website': {
    cat: 'Service / Staff / Product Feedback',
    subcat: 'Website Feedback'
  },
  'Service Request - Under Warranty-Loose / Align / Laser / Polish': {
    cat: 'Service Request - Within Warranty',
    subcat: 'Product Alignment / Loosening /  Shaking'
  },
  'Service Request - Under Warranty-Fabric - Sagging / Stitches coming out /Peel off': {
    cat: 'Service Request - Within Warranty',
    subcat: 'Stitches coming out / Sagging / Peel off'
  },
  'Service Request - Under Warranty-Fungus / Termite': {
    cat: 'Service Request - Within Warranty',
    subcat: 'Fungus / Termite'
  },
  'Service Request - Under Warranty-Crack / Bend / Breakage / Peel Off': {
    cat: 'Service Request - Within Warranty',
    subcat: 'Crack / Bend / Breakage'
  },
  'Service Request - Under Warranty-Rusting': {
    cat: 'Service Request - Within Warranty',
    subcat: 'Rusting'
  },
  'Service Request - Under Warranty-Part Not Working': {
    cat: 'Service Request - Within Warranty',
    subcat: 'Part / Componant / Mechanism Not Working'
  },

  'Service Request - After Warranty-Loose / Align / Laser / Polish': {
    cat: 'Service Request - After Warranty',
    subcat: 'Product Alignment / Loosening /  Shaking'
  },
  'Service Request - After Warranty-Sagging / Stitches coming out /Peel off': {
    cat: 'Service Request - After Warranty',
    subcat: 'Stitches coming out / Sagging / Peel off'
  },
  'Service Request - After Warranty-Fungus / Termite': {
    cat: 'Service Request - After Warranty',
    subcat: 'Fungus / Termite'
  },
  'Service Request - After Warranty-Crack / Bend / Breakage / Peel Off': {
    cat: 'Service Request - After Warranty',
    subcat: 'Crack / Bend / Breakage'
  },
  'Service Request - After Warranty-Rusting': {
    cat: 'Service Request - After Warranty',
    subcat: 'Rusting'
  },
  'Service Request - After Warranty-Part Not Working': {
    cat: 'Service Request - After Warranty',
    subcat: 'Part / Componant / Mechanism Not Working'
  },

  'Customer Request-Wants assembly/Dismantling': {
    cat: 'Product Dismantling / Re-Assembly support',
    subcat: ''
  },
  'Registration for Service Camp-Furniture': {
    cat: 'Free Service camp registration',
    subcat: ''
  },
  'Customer Request-Wants to Reschedule Delivery': {
    cat: 'Change delivery date',
    subcat: ''
  },
  'Customer Request-Wants to Reschedule Fitment': {
    cat: 'Change Installation date',
    subcat: ''
  },
  'Delivery date Change - Disagree-Stock Not Committed': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'Installation / Fitment Date elapsed-48 hour elapsed': {
    cat: 'Installation of product delayed',
    subcat: ''
  }, // reverse mapping for salesforce crm only
  'Wrong Material Delivered-Wrong Color / Specification': {
    cat: 'Delivered product doesn’t match with the specification',
    subcat: 'Incorrect Colour / Specification'
  },
  'Wrong Material Delivered-Wrong Product delivered': {
    cat: 'Delivered product doesn’t match with the specification',
    subcat: 'Incorrect product'
  },
  'Wrong Material Delivered-Incorrect / Incomplete Package': {
    cat: 'Delivered product doesn’t match with the specification',
    subcat: 'Incorrect package'
  },

  'Hardware parts missing-Some Component / Part Missing': {
    cat: 'Missing componant in the product',
    subcat: ''
  },

  'Damaged Material Delivered-Chip Off / Scratches': {
    cat: 'Received product with damage',
    subcat: 'Chip Off / Scratches'
  },
  'Damaged Material Delivered-Crack / Breakage /Bend': {
    cat: 'Received product with damage',
    subcat: 'Crack / Breakage /Bend'
  },
  'Damaged Material Delivered-Dusty / Dirty Product': {
    cat: 'Received product with damage',
    subcat: 'Dusty / Dirty Product'
  },
  'Damaged Material Delivered-Glass /Mirror Broken': {
    cat: 'Received product with damage',
    subcat: 'Glass /Mirror Broken'
  },
  'Damaged Material Delivered-Marble Damage': {
    cat: 'Received product with damage',
    subcat: 'Marble Damage'
  },
  'Damaged Material Delivered-Tear / Open Stitches': {
    cat: 'Received product with damage',
    subcat: 'Tear / Open Stitches'
  },

  'Defective Material Delivered-Mechanism not working': {
    cat: 'Received product with defect',
    subcat: 'Mechanism not working'
  },
  'Defective Material Delivered-chromium Plating / Lamination /Lazar issue': {
    cat: 'Received product with defect',
    subcat: 'Lamination issue'
  },
  'Defective Material Delivered-Other Manufacturing Defect': {
    cat: 'Received product with defect',
    subcat: 'other manufacturing defect'
  },
  'Defective Material Delivered-Color variance in product': {
    cat: 'Received product with defect',
    subcat: 'Color variance in product'
  },
  'Defective Material Delivered-Size mismatch / groove mismatch': {
    cat: 'Received product with defect',
    subcat: 'Unable to complete assembly'
  },

  'Pickup Date Elapsed-Old Product Under Exchange': {
    cat: 'Pickup during exchange offer delayed',
    subcat: ''
  },

  'Pickup Date Elapsed-Return pickup': {
    cat: 'Return pickup',
    subcat: ''
  },
  'BILLING-Excess Charged / Price Issue': {
    cat: 'Incorrect price billed',
    subcat: ''
  },
  'BILLING-Pending Refund': {
    cat: 'Pending Refund',
    subcat: ''
  },

  'BEHAVIOUR-Tips asked': {
    cat: '',
    subcat: 'Service / Staff / Product Feedback'
  },
  'Call back requested-Same day delivery - SN': {
    cat: '',
    subcat: 'Request to Change delivery date'
  },
  'Call back requested-Same day delivery - SY': {
    cat: '',
    subcat: 'Request to Change delivery date'
  },
  'Call back requested-Same day installation': {
    cat: '',
    subcat: 'Request to Change Installation date'
  },
  'Customer Request-Payback Points not received': {
    cat: '',
    subcat: 'About Cashback/ Finance / EMI'
  },
  'Customer Request-RL visit Required after fresh fitment': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Damaged Material Delivered-Delivery Returned as damaged': {
    cat: '',
    subcat: 'Received product with damage'
  },
  'Defective Material Delivered-solid wood joint open / Crack': {
    cat: '',
    subcat: 'Received product with defect'
  },
  'Delivery date Change - Disagree-Stock Committed': {
    cat: '',
    subcat: 'Delivery of product delayed'
  },
  'Delivery Date Elapsed - SN-Delivery pending - stock not committed': {
    cat: '',
    subcat: 'Delivery of product delayed'
  },
  'DELIVERY_DATE_SY-Found Damaged / Defective at WH': {
    cat: '',
    subcat: 'Delivery of product delayed'
  },
  'DELIVERY_DATE_SY-Invoiced': {
    cat: '',
    subcat: 'Delivery of product delayed'
  },
  'DELIVERY_DATE_SY-Not Invoiced': {
    cat: '',
    subcat: 'Delivery of product delayed'
  },
  'DELIVERY_DATE_SY-Physical product not traceable': {
    cat: '',
    subcat: 'Delivery of product delayed'
  },
  'Hardware parts missing-Full Hardware Missing': {
    cat: '',
    subcat: 'Missing componant in the product'
  },
  'Hardware parts missing-Some Hardware Missing': {
    cat: '',
    subcat: 'Missing componant in the product'
  },
  'Improper fiment-Loose fitment within 1 week of usage': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Improper fiment-Part /Product damage during fitment': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Additional order as per customer demand (unpaid)': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Additional order as per customer request (paid)': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Hardware/parts missing from the site': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Order under warranty terms': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Short supply from vendor': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Transit damage': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Wrong ordering from the store': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Kitchen Service Order-Wrong supply from vendor': {
    cat: '',
    subcat: 'Service Request - Within Warranty'
  },
  'Gift Voucher-Expired - Extend Validity': {
    cat: '',
    subcat: 'Voucher / Coupon support'
  },
  'Work not completed-Work not completed (DnB/Kitchen)': {
    cat: '',
    subcat: 'Modular Kitchen / Design and Build Project'
  },
  'Wrong Material Delivered-Wrong Booking by Store': {
    cat: '',
    subcat: 'Delivered product doesn’t match with the specification'
  }
};
export default caseReverseMapping;
