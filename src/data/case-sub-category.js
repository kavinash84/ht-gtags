const caseSubCategories = {
  BEHAVIOUR_ISSUE: [
    {
      value: 'BEHAVIOUR_CALL_CENTER_AGENT',
      label: 'CALL CENTER AGENT'
    },
    {
      value: 'BEHAVIOUR_DELIVERY_PERSON',
      label: 'DELIVERY PERSON'
    },
    {
      value: 'BEHAVIOUR_FITTER_TECHNICIAN',
      label: 'FITTER /TECHNICIAN'
    },
    {
      value: 'BEHAVIOUR_STORE_STAFF',
      label: 'STORE STAFF'
    },
    {
      value: 'BEHAVIOUR_TIPS_ASKED',
      label: 'TIPS ASKED'
    }
  ],
  BILLING_ISSUE: [
    {
      value: 'BILLING_ISSUE_CASH_BACK/PROCESSION_FEE/FINANCE',
      label: 'CASH BACK / PROCESSION FEE / FINANCE'
    },
    {
      value: 'BILLING_ISSUE_EXCESS_CHARGED/PRICE_ISSUE',
      label: 'EXCESS CHARGED / PRICE ISSUE'
    },
    {
      value: 'BILLING_ISSUE_PENDING_REFUND',
      label: 'PENDING REFUND'
    },
    {
      value: 'BILLING_ISSUE Double Swipe of Card (Debit/Credit)',
      label: 'BILLING_ISSUE Double Swipe of Card (Debit/Credit)'
    }
  ],
  DAMAGED_MATERIAL_DELIVERED: [
    {
      value: 'DAMAGED_MATERIAL_DELIVERED_CHIP_OFF/SCRATCHES',
      label: 'CHIP OFF/SCRATCHES'
    },
    {
      value: 'DAMAGED_MATERIAL_DELIVERED_CRACK/BREAKAGE/BEND',
      label: 'CRACK/ BREAKAGE/BEND'
    },
    {
      value: 'DAMAGED_MATERIAL_DELIVERED_DELIVERY_RETURNED_AS_DAMAGED',
      label: 'DELIVERY RETURNED AS DAMAGED'
    },
    {
      value: 'DAMAGED_MATERIAL_DELIVERED_DUSTY/DIRTY_PRODUCT',
      label: 'DUSTY / DIRTY PRODUCT'
    },
    {
      value: 'DAMAGED_MATERIAL_DELIVERED_GLASS/MIRROR_BROKEN',
      label: 'GLASS /MIRROR BROKEN'
    },
    {
      value: 'DAMAGED_MATERIAL_DELIVERED_MARBLE_DAMAGE',
      label: 'MARBLE DAMAGE'
    },
    {
      value: 'DAMAGED_MATERIAL_DELIVERED_TEAR/OPEN_STITCHES',
      label: 'TEAR / OPEN STITCHES'
    }
  ],
  DEFECTIVE_MATERIAL_DELIVERED: [
    {
      value: 'DEFECTIVE_MATERIAL_DELIVERED_CHROMIUM_PLATING/LAMINATION/LAZAR_ISSUE',
      label: 'CHROMIUM PLATING / LAMINATION /LAZAR ISSUE'
    },
    {
      value: 'DEFECTIVE_MATERIAL_DELIVERED_COLOR_VARIANCE_IN_PRODUCT',
      label: 'COLOR VARIANCE IN PRODUCT'
    },
    {
      value: 'DEFECTIVE_MATERIAL_DELIVERED_HOLE/GROOVE_MISMATCH',
      label: 'HOLE / GROOVE MISMATCH'
    },
    {
      value: 'DEFECTIVE_MATERIAL_DELIVERED_MECHANISM_NOT_WORKING',
      label: 'MECHANISM NOT WORKING'
    },
    {
      value: 'DEFECTIVE_MATERIAL_DELIVERED_OTHER_MANUFACTURING_DEFECT',
      label: 'OTHER MANUFACTURING DEFECT'
    },
    {
      value: 'DEFECTIVE_MATERIAL_DELIVERED_SIZE_MISMATCH_OF_PANEL/COMPONENTS',
      label: 'SIZE MISMATCH OF PANEL / COMPONENTS'
    },
    {
      value: 'DEFECTIVE_MATERIAL_DELIVERED_SOLID_WOOD_JOINT_OPEN/CRACK',
      label: 'SOLID WOOD JOINT OPEN / CRACK'
    }
  ],
  DELIVERY_DATE_CHANGE: [
    {
      value: 'DELIVERY_DATE_CHANGE_DISAGREE_STOCK_COMMITTED',
      label: 'Delivery date Change - Disagree Stock Committed'
    },
    {
      value: 'DELIVERY_DATE_CHANGE_DISAGREE_STOCK_NOT_COMMITTED',
      label: 'Delivery date Change - Disagree Stock Committed'
    }
  ],
  DELIVERY_DATE_ELAPSED: [
    {
      value: 'DELIVERY_DATE_ELAPSED_SN_DELIVERY_PENDING/STOCK_NOT_COMMITTED',
      label: 'DELIVERY DATE ELAPSED – SN DELIVERY PENDING - STOCK NOT COMMITTED'
    }
  ],
  DELIVERY_DATE_SY: [
    {
      value: 'DELIVERY_DATE_SY_Found_Damaged/Defective_at_WH',
      label: 'DELIVERY DATE SY Found Damaged / Defective at WH'
    },
    {
      value: 'DELIVERY_DATE_SY_Invoiced',
      label: 'DELIVERY DATE_SY Invoiced'
    },
    {
      value: 'DELIVERY_DATE_SY_Not_Invoiced',
      label: 'DELIVERY DATE SY Not Invoiced'
    },
    {
      value: 'DELIVERY_DATE_SY_Physical_product_not_traceable',
      label: 'DELIVERY DATE SY Physical product not traceable'
    }
  ],
  SERVICE_REQUEST_AFTER_WARRANTY: [
    {
      value: 'Service_Request_After_Warranty_Fungus/Termite',
      label: 'Service Request_After Warranty Fungus / Termite'
    },
    {
      value: 'Service_Request_After_Warranty_Loose/Align/Laser/Polish',
      label: 'Service Request_After Warranty Loose / Align / Laser / Polish'
    },
    {
      value: 'Service_Request_After_Warranty_Part_Not_Working/Leakage',
      label: 'Service Request_After Warranty Part Not Working / Leakage'
    },
    {
      value: 'Service_Request_After_Warranty_Rusting',
      label: 'Service Request_After Warranty Rusting'
    },
    {
      value: 'Service_Request_After_Warranty_Fabric_Sagging/Stitches_coming_out/Peel_off',
      label: 'Service Request_After Warranty Fabric_Sagging/Stitches coming out /Peel off'
    },
    {
      value: 'Service Request_After Warranty Crack / Bend / Breakage / Peel Off',
      label: 'Service Request_After Warranty Crack / Bend / Breakage / Peel Off'
    }
  ],
  SERVICE_REQUEST_UNDER_WARRANTY: [
    {
      value: 'Service Request_Under Warranty Crack / Bend / Breakage / Peel Off',
      label: 'Service Request_Under Warranty Crack / Bend / Breakage / Peel Off'
    },
    {
      value: 'Service Request_Under Warranty Fabric_Sagging / Stitches coming out /Peel off',
      label: 'Service Request_Under Warranty Fabric_Sagging / Stitches coming out /Peel off'
    },
    {
      value: 'Service Request_Under Warranty Fungus / Termite',
      label: 'Service Request_Under Warranty Fungus / Termite'
    },
    {
      value: 'Service Request_Under Warranty Loose / Align / Laser / Polish',
      label: 'Service Request_Under Warranty Loose / Align / Laser / Polish'
    },
    {
      value: 'Service Request_Under Warranty Part Not Working / Leakage',
      label: 'Service Request_Under Warranty Part Not Working / Leakage'
    },
    {
      value: 'Service Request_Under Warranty Rusting',
      label: 'Service Request_Under Warranty Rusting'
    }
  ],
  PARTS_HARDWARE_MISSING: [
    {
      value: 'PARTS_ HARDWARE_MISSING Full Hardware Missing',
      label: 'PARTS_ HARDWARE_MISSING Full Hardware Missing'
    },
    {
      value: 'PARTS_ HARDWARE_MISSING Some Component / Part Missing',
      label: 'PARTS_ HARDWARE_MISSING Some Component / Part Missing'
    },
    {
      value: 'PARTS_ HARDWARE_MISSING Some Hardware Missing',
      label: 'PARTS_ HARDWARE_MISSING Some Hardware Missing'
    },
    {
      value: 'PARTS_ HARDWARE_MISSING Full Hardware Missing',
      label: 'PARTS_ HARDWARE_MISSING Full Hardware Missing'
    },
    {
      value: 'PARTS_ HARDWARE_MISSING Some Component / Part Missing',
      label: 'PARTS_ HARDWARE_MISSING Some Component / Part Missing'
    },
    {
      value: 'PARTS_ HARDWARE_MISSING Some Hardware Missing',
      label: 'PARTS_ HARDWARE_MISSING Some Hardware Missing'
    }
  ],
  IMPROPER_FIMENT: [
    {
      value: 'Improper fiment Loose fitment within 1 week of usage',
      label: 'Improper fiment Loose fitment within 1 week of usage'
    },
    {
      value: 'Improper fiment Part /Product damage during fitment',
      label: 'Improper fiment Part /Product damage during fitment'
    }
  ],
  INSTALLATION_FITMENT_DATE_TIME_ELAPSED: [
    {
      value: 'Installation / Fitment Date Time Elapsed 48 hour elapsed',
      label: 'Installation / Fitment Date Time Elapsed 48 hour elapsed'
    }
  ],
  PICKUP_DATE_ELAPSED: [
    {
      value: 'Pickup Date Elapsed Old Product Under Exchange',
      label: 'Pickup Date Elapsed Old Product Under Exchange'
    }
  ],
  WORK_NOT_COMPLETED: [
    {
      value: 'Work not completed Work not completed (DnB/Kitchen)',
      label: 'Work not completed Work not completed (DnB/Kitchen)'
    }
  ],
  WRONG_MATERIAL_DELIVERED: [
    {
      value: 'WRONG_MATERIAL_DELIVERED Incorrect / Incomplete Package',
      label: 'WRONG_MATERIAL_DELIVERED Incorrect / Incomplete Package'
    },
    {
      value: 'WRONG_MATERIAL_DELIVERED Wrong Booking by Store',
      label: 'WRONG_MATERIAL_DELIVERED Wrong Booking by Store'
    },
    {
      value: 'WRONG_MATERIAL_DELIVERED Wrong Color / Specification',
      label: 'WRONG_MATERIAL_DELIVERED Wrong Color / Specification'
    },
    {
      value: 'WRONG_MATERIAL_DELIVERED Wrong Product delivered',
      label: 'WRONG_MATERIAL_DELIVERED Wrong Product delivered'
    },
    {
      value: 'BILLING_ISSUE Bill Clarification',
      label: 'BILLING_ISSUE Bill Clarification'
    }
  ],
  BLANK_CALL: [
    {
      value: 'Blank call Blank call /call drop/no Response',
      label: 'Blank call Blank call /call drop/no Response'
    }
  ],
  FEEDBACK: [
    {
      value: 'Feedback Appreciation',
      label: 'Feedback Appreciation'
    },
    {
      value: 'Feedback Product Prices are mismatch / High',
      label: 'Feedback Product Prices are mismatch / High'
    },
    {
      value: 'Feedback Product Related',
      label: 'Feedback Product Related'
    }
  ],
  GENERAL_ENQUIRY: [
    {
      value: 'General Enquiry Information about Promotion',
      label: 'General Enquiry Information about Promotion'
    },
    {
      value: 'General Enquiry Information about Gift Vouchers',
      label: 'General Enquiry Information about Gift Vouchers'
    },
    {
      value: 'General Enquiry Information about Storeloc/Timings/ContNo',
      label: 'General Enquiry Information about Storeloc/Timings/ContNo'
    }
  ],
  ORDER_RELATED: [
    {
      value: 'Order Related Cancellation / refund information',
      label: 'Order Related Cancellation / refund information'
    },
    {
      value: 'Order Related Confirm Date & Time of Delivery',
      label: 'Order Related Confirm Date & Time of Delivery'
    },
    {
      value: 'Order Related Confirm Date & Time of Installation/Fitment',
      label: 'Order Related Confirm Date & Time of Installation/Fitment'
    }
  ],
  OUTBOUND_CALL: [
    {
      value: 'Outbound call Call to Store for Follow up',
      label: 'Outbound call Call to Store for Follow up'
    },
    {
      value: 'Outbound call Complaint Closure Confirmation Call',
      label: 'Outbound call Complaint Closure Confirmation Call'
    },
    {
      value: 'Outbound call CSAT Call',
      label: 'Outbound call CSAT Call'
    },
    {
      value: 'Outbound call Service Camp – Not Reachable',
      label: 'Outbound call Service Camp – Not Reachable'
    },
    {
      value: 'Outbound call Service Camp – Required Later/Not Required',
      label: 'Outbound call Service Camp – Required Later/Not Required'
    },
    {
      value: 'Outbound call Status Update call to Customer',
      label: 'Outbound call Status Update call to Customer'
    },
    {
      value: 'Outbound call Recall Abandon Call – connected',
      label: 'Outbound call Recall Abandon Call – connected'
    },
    {
      value: 'Outbound call Recall Abandon Call_No response',
      label: 'Outbound call Recall Abandon Call_No response'
    }
  ],
  LEAD: [
    {
      value: 'Lead Hot',
      label: 'Lead Hot'
    },
    {
      value: 'Lead Warm',
      label: 'Lead Warm'
    }
  ],
  REQUEST_FOLLOWUP: [
    {
      value: 'Request Followup Beyond TAT',
      label: 'Request Followup Beyond TAT'
    },
    {
      value: 'Request Followup Within TAT',
      label: 'Request Followup Within TAT'
    }
  ],
  COMPLAINT_FOLLOWUP: [
    {
      value: 'Complaint Followup Beyond TAT',
      label: 'Complaint Followup Beyond TAT'
    },
    {
      value: 'Complaint Followup Within TAT',
      label: 'Complaint Followup Within TAT'
    }
  ],
  CHANGE_IN_ADDRESS: [
    {
      value: 'Change in Address Change Delivery Address',
      label: 'Change in Address Change Delivery Address'
    }
  ],
  CALL_BACK_REQUESTED: [
    {
      value: 'Call back requested Same day delivery – SN',
      label: 'Call back requested Same day delivery – SN'
    },
    {
      value: 'Call back requested Same day delivery – SY',
      label: 'Call back requested Same day delivery – SY'
    },
    {
      value: 'Call back requested Same day installation',
      label: 'Call back requested Same day installation'
    }
  ],
  CUSTOMER_REQUEST: [
    {
      value: 'Customer Request Online order – within 24hrs cancellation',
      label: 'Customer Request Online order – within 24hrs cancellation'
    },
    {
      value: 'Customer Request PB point upload',
      label: 'Customer Request PB point upload'
    },
    {
      value: 'Customer Request RL visit Required after fresh fitment',
      label: 'Customer Request RL visit Required after fresh fitment'
    },
    {
      value: 'Customer Request T24 free Recharge not received',
      label: 'Customer Request T24 free Recharge not received'
    },
    {
      value: 'Customer Request Wants assembly/Dismantling',
      label: 'Customer Request Wants assembly/Dismantling'
    },
    {
      value: 'Customer Request Wants Duplicate Bill',
      label: 'Customer Request Wants Duplicate Bill'
    },
    {
      value: 'Customer Request Wants to Reschedule Delivery',
      label: 'Customer Request Wants to Reschedule Delivery'
    },
    {
      value: 'Customer Request Wants to Reschedule Fitment',
      label: 'Customer Request Wants to Reschedule Fitment'
    }
  ],
  REGISTRATION_FOR_SERVICE_CAMP: [
    {
      value: 'Registration for Service Camp Furniture',
      label: 'Registration for Service Camp Furniture'
    },
    {
      value: 'Registration for Service Camp Kitchen',
      label: 'Registration for Service Camp Kitchen'
    }
  ],
  KITCHEN_SERVICE_ORDER: [
    {
      value: 'Kitchen Service Order Additional order as per customer demand (unpaid)',
      label: 'Kitchen Service Order Additional order as per customer demand (unpaid)'
    },
    {
      value: 'Kitchen Service Order Additional order as per customer request (paid)',
      label: 'Kitchen Service Order Additional order as per customer request (paid)'
    },
    {
      value: 'Kitchen Service Order Customer site variation',
      label: 'Kitchen Service Order Customer site variation'
    },
    {
      value: 'Kitchen Service Order Hardware/parts missing from the site',
      label: 'Kitchen Service Order Hardware/parts missing from the site'
    },
    {
      value: 'Kitchen Service Order Order under warranty terms',
      label: 'Kitchen Service Order Order under warranty terms'
    },
    {
      value: 'Kitchen Service Order Short supply from vendor',
      label: 'Kitchen Service Order Short supply from vendor'
    },
    {
      value: 'Kitchen Service Order Transit damage',
      label: 'Kitchen Service Order Transit damage'
    },
    {
      value: 'Kitchen Service Order Wrong ordering from the store',
      label: 'Kitchen Service Order Wrong ordering from the store'
    },
    {
      value: 'Kitchen Service Order Wrong supply from vendor',
      label: 'Kitchen Service Order Wrong supply from vendor'
    }
  ],
  GIFT_VOUCHER: [
    {
      value: 'Gift Voucher Expired - Extend Validity',
      label: 'Gift Voucher Expired - Extend Validity'
    },
    {
      value: 'Gift Voucher Unable to Redeem',
      label: 'Gift Voucher Unable to Redeem'
    }
  ]
};
export default caseSubCategories;
