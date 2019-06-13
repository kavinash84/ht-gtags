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

  'Service Request - After warranty-Loose / Align / Laser / Polish': {
    cat: 'Service Request - After Warranty',
    subcat: 'Product Alignment / Loosening /  Shaking'
  },
  'Service Request - After warranty-Fabric - Sagging / Stitches coming out /Peel off': {
    cat: 'Service Request - After Warranty',
    subcat: 'Stitches coming out / Sagging / Peel off'
  },
  'Service Request - After warranty-Fungus / Termite': {
    cat: 'Service Request - After Warranty',
    subcat: 'Fungus / Termite'
  },
  'Service Request - After warranty-Crack / Bend / Breakage / Peel Off': {
    cat: 'Service Request - After Warranty',
    subcat: 'Crack / Bend / Breakage'
  },
  'Service Request - After warranty-Rusting': {
    cat: 'Service Request - After Warranty',
    subcat: 'Rusting'
  },
  'Service Request - After warranty-Part Not Working': {
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
  'Delivery date Change - Disagree-Stock not committed': {
    cat: 'Delivery of product delayed',
    subcat: ''
  },
  'Installation / Fitment Date elapsed-48 hour elapsed': {
    cat: 'Installation of product delayed',
    subcat: ''
  },

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

  'Hardware parts missing-Some Component / Part Missing ': {
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
  'BILLING-pending refund': {
    cat: 'Pending Refund',
    subcat: ''
  }
};
export default caseReverseMapping;
