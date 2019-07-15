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
    // subcat: 'Delivery person Feedback',
    subcat: ''
  },
  'BEHAVIOUR-Fitter /Technician': {
    cat: 'Service / Staff / Product Feedback',
    // subcat: 'Technician / Fitter Feedback',
    subcat: ''
  },
  'BEHAVIOUR-Call Center Agent': {
    cat: 'Service / Staff / Product Feedback',
    // subcat: 'Contact center Feedback',
    subcat: ''
  },
  'BEHAVIOUR-Store Staff': {
    cat: 'Service / Staff / Product Feedback',
    // subcat: 'Store / Store Staff Feedback',
    subcat: ''
  },
  'BEHAVIOUR-Website': {
    cat: 'Service / Staff / Product Feedback',
    // subcat: 'Website Feedback',
    subcat: ''
  },
  'Service Request - Under Warranty-Loose / Align / Laser / Polish': {
    cat: 'Service Request - Within Warranty',
    // subcat: 'Product Alignment / Loosening /  Shaking'
    subcat: ''
  },
  'Service Request - Under Warranty-Fabric - Sagging / Stitches coming out /Peel off': {
    cat: 'Service Request - Within Warranty',
    // subcat: 'Stitches coming out / Sagging / Peel off',
    subcat: ''
  },
  'Service Request - Under Warranty-Fungus / Termite': {
    cat: 'Service Request - Within Warranty',
    // subcat: 'Fungus / Termite',
    subcat: ''
  },
  'Service Request - Under Warranty-Crack / Bend / Breakage / Peel Off': {
    cat: 'Service Request - Within Warranty',
    // subcat: 'Crack / Bend / Breakage',
    subcat: ''
  },
  'Service Request - Under Warranty-Rusting': {
    cat: 'Service Request - Within Warranty',
    // subcat: 'Rusting',
    subcat: ''
  },
  'Service Request - Under Warranty-Part Not Working': {
    cat: 'Service Request - Within Warranty',
    // subcat: 'Part / Componant / Mechanism Not Working',
    subcat: ''
  },

  'Service Request - After Warranty-Loose / Align / Laser / Polish': {
    cat: 'Service Request - After Warranty',
    // subcat: 'Product Alignment / Loosening /  Shaking',
    subcat: ''
  },
  'Service Request - After Warranty-Sagging / Stitches coming out /Peel off': {
    cat: 'Service Request - After Warranty',
    // subcat: 'Stitches coming out / Sagging / Peel off',
    subcat: ''
  },
  'Service Request - After Warranty-Fungus / Termite': {
    cat: 'Service Request - After Warranty',
    // subcat: 'Fungus / Termite',
    subcat: ''
  },
  'Service Request - After Warranty-Crack / Bend / Breakage / Peel Off': {
    cat: 'Service Request - After Warranty',
    // subcat: 'Crack / Bend / Breakage',
    subcat: ''
  },
  'Service Request - After Warranty-Rusting': {
    cat: 'Service Request - After Warranty',
    // subcat: 'Rusting',
    subcat: ''
  },
  'Service Request - After Warranty-Part Not Working': {
    cat: 'Service Request - After Warranty',
    // subcat: 'Part / Componant / Mechanism Not Working',
    subcat: ''
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
    cat: 'Request to Change delivery date',
    subcat: ''
  },
  'Customer Request-Wants to Reschedule Fitment': {
    cat: 'Request to Change Installation date',
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
    // subcat: 'Incorrect product',
    subcat: ''
  },
  'Wrong Material Delivered-Incorrect / Incomplete Package': {
    cat: 'Delivered product doesn’t match with the specification',
    // subcat: 'Incorrect package',
    subcat: ''
  },

  'Hardware parts missing-Some Component / Part Missing': {
    cat: 'Missing componant in the product',
    subcat: ''
  },

  'Damaged Material Delivered-Chip Off / Scratches': {
    cat: 'Received product with damage',
    // subcat: 'Chip Off / Scratches',
    subcat: ''
  },
  'Damaged Material Delivered-Crack / Breakage /Bend': {
    cat: 'Received product with damage',
    // subcat: 'Crack / Breakage /Bend',
    subcat: ''
  },
  'Damaged Material Delivered-Dusty / Dirty Product': {
    cat: 'Received product with damage',
    // subcat: 'Dusty / Dirty Product',
    subcat: ''
  },
  'Damaged Material Delivered-Glass /Mirror Broken': {
    cat: 'Received product with damage',
    // subcat: 'Glass /Mirror Broken',
    subcat: ''
  },
  'Damaged Material Delivered-Marble Damage': {
    cat: 'Received product with damage',
    // subcat: 'Marble Damage',
    subcat: ''
  },
  'Damaged Material Delivered-Tear / Open Stitches': {
    cat: 'Received product with damage',
    // subcat: 'Tear / Open Stitches',
    subcat: ''
  },

  'Defective Material Delivered-Mechanism not working': {
    cat: 'Received product with defect',
    // subcat: 'Mechanism not working',
    subcat: ''
  },
  'Defective Material Delivered-chromium Plating / Lamination /Lazar issue': {
    cat: 'Received product with defect',
    // subcat: 'Lamination issue',
    subcat: ''
  },
  'Defective Material Delivered-Other Manufacturing Defect': {
    cat: 'Received product with defect',
    // subcat: 'other manufacturing defect',
    subcat: ''
  },
  'Defective Material Delivered-Color variance in product': {
    cat: 'Received product with defect',
    // subcat: 'Color variance in product',
    subcat: ''
  },
  'Defective Material Delivered-Size mismatch / groove mismatch': {
    cat: 'Received product with defect',
    // subcat: 'Unable to complete assembly',
    subcat: ''
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
    cat: 'Service / Staff / Product Feedback',
    subcat: ''
  },
  'Call back requested-Same day delivery - SN': {
    cat: 'Request to Change delivery date',
    subcat: ''
  },
  'Call back requested-Same day delivery - SY': {
    cat: 'Request to Change delivery date',
    subcat: ''
  },
  'Call back requested-Same day installation': {
    cat: 'Request to Change Installation date',
    subcat: ''
  },
  'Customer Request-Payback Points not received': {
    cat: 'About Cashback/ Finance / EMI',
    subcat: ''
  },
  'Customer Request-RL visit Required after fresh fitment': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Damaged Material Delivered-Delivery Returned as damaged': {
    cat: 'Received product with damage',
    subcat: ''
  },
  'Defective Material Delivered-solid wood joint open / Crack': {
    cat: 'Received product with defect',
    subcat: ''
  },
  'Delivery date Change - Disagree-Stock Committed': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'Delivery Date Elapsed - SN-Delivery pending - stock not committed': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'DELIVERY_DATE_SY-Found Damaged / Defective at WH': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'DELIVERY_DATE_SY-Invoiced': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'DELIVERY_DATE_SY-Not Invoiced': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'DELIVERY_DATE_SY-Physical product not traceable': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'Hardware parts missing-Full Hardware Missing': {
    cat: 'Missing componant in the product',
    subcat: ''
  },
  'Hardware parts missing-Some Hardware Missing': {
    cat: 'Missing componant in the product',
    subcat: ''
  },
  'Improper fiment-Loose fitment within 1 week of usage': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Improper fiment-Part /Product damage during fitment': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Additional order as per customer demand (unpaid)': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Additional order as per customer request (paid)': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Hardware/parts missing from the site': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Order under warranty terms': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Short supply from vendor': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Transit damage': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Wrong ordering from the store': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Wrong supply from vendor': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Kitchen Service Order-Kitchen Service Order': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Gift Voucher-Expired - Extend Validity': {
    cat: 'Voucher / Coupon support',
    subcat: ''
  },
  'Work not completed-Work not completed (DnB/Kitchen)': {
    cat: 'Modular Kitchen / Design and Build Project',
    subcat: ''
  },
  'Wrong Material Delivered-Wrong Booking by Store': {
    cat: 'Delivered product doesn’t match with the specification',
    subcat: ''
  },
  'Customer Request-Wants assembly / dismantling': {
    cat: 'Product Dismantling / Re-Assembly support',
    subcat: ''
  },
  'Gift Voucher-Individual Order': {
    cat: 'Voucher / Coupon support',
    subcat: ''
  },
  'Hardware parts missing-Some Componant / part missing': {
    cat: 'Missing componant in the product',
    subcat: ''
  },
  'Registration for Service Camp-Kitchen': {
    cat: 'Free Service camp registration',
    subcat: ''
  },
  'Update Mobile Number-Update Mobile Number': {
    cat: 'Request for Mobile /Address change',
    subcat: ''
  },
  'Wrong Material Delivered-Wrong Colour / Specification': {
    cat: 'Delivered product doesn’t match with the specification',
    subcat: ''
  },
  'pickup date elapsed-Return pickup': {
    cat: 'Return pickup',
    subcat: ''
  },
  'E-Defective Product-Product not working': {
    cat: 'Received product with defect',
    subcat: ''
  },
  'E-Damaged Product Received-Broken Body': {
    cat: 'Received product with damage',
    subcat: ''
  },
  'E-Damaged Product Received-Dent/Crack': {
    cat: 'Received product with damage',
    subcat: ''
  },
  'E-Damaged Product Received-Dusty/Dirty Product': {
    cat: 'Received product with damage',
    subcat: ''
  },
  'E-Damaged Product Received-Glass/Screen Broken': {
    cat: 'Received product with damage',
    subcat: ''
  },
  'E-Damaged Product Received-Scratches': {
    cat: 'Received product with damage',
    subcat: ''
  },
  'E-Services-Battery Issue': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Component / Motor / Button Issue': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Display Issue': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Extended Warranty Claim': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Heating / Cooling Issue': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Leakage Issue': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Mobile Insurance': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Oxygen': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Payback': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Physical Damage': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Product dead': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Service Required - Within Warranty': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Smart Assurance': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Smart Tech': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Software Issue': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'E-Services-Sound Issue': {
    cat: 'Service Request - Within Warranty',
    subcat: ''
  },
  'Gift Voucher-Corporate Order': {
    cat: 'Voucher / Coupon support',
    subcat: ''
  }
};
export default caseReverseMapping;
