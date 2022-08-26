export const formatToArray = data => {
  const cartItems = Object.values(data);
  const arr = cartItems.map(item => {
    if (item.packageItems) {
      return {
        id_customer_cart: item.cart_ids[0],
        cart_ids: item.cart_ids,
        fk_customer: null,
        session_id: "",
        configurable_sku: "",
        simple_sku: "",
        shipping_charges: 0,
        pincode: "",
        coupon_code: null,
        package_id: null,
        created_at: "",
        updated_at: "",
        qty: 1,
        package_qty: 0,
        is_bogo: 0,
        is_display: 1,
        packageItems: item.packageItems,
        product_info: {
          packageId: item.package_url.split("/")[
            item.package_url.split("/").length - 1
          ],
          product_id: item.packageId,
          name: item.name,
          image: item.image_url,
          url: item.package_url,
          delivery_time_text: item.delivery_date_text,
          shipping_time_text: "",
          stock: item.stock || 1,
          max_display_stock: "",
          cart_rule_discount: item.packageDiscount,
          cart_rule_display_names: [],
          is_freebie: null,
          discount: Math.floor(item.discountPercentage),
          giftimageset: false,
          gift_wrap: item.gift_wrap,
          special_price: 0,
          net_price: item.paidPrice,
          unit_price: item.maxRetailPrice,
          is_available: true,
          category_details: [],
          color: "",
          color_family: "",
          brand: "Hometown",
          is_deliverable: item.is_deliverable,
          assembly_service: false,
          couponDiscount: 0,
          demo_product: item.demo_product,
          offer_message: item.offer_message
        }
      };
    }
    return {
      id_customer_cart: item.cart_ids[0],
      cart_ids: item.cart_ids,
      fk_customer: null,
      session_id: "",
      configurable_sku: item.configurable_sku,
      simple_sku: item.sku,
      shipping_charges: item.shipping_amount,
      pincode: "",
      coupon_code: null,
      package_id: null,
      created_at: "",
      updated_at: "",
      qty: item.qty,
      package_qty: 0,
      is_bogo: 0,
      is_display: 1,
      product_info: {
        product_id: item.config_id,
        name: item.name,
        image: item.image_url,
        url: item.pdp_url,
        delivery_time_text: item.delivery_date_text,
        shipping_time_text: "",
        stock: item.stock,
        max_display_stock: "",
        cart_rule_discount: item.cart_rule_discount,
        cart_rule_display_names: item.cart_rule_display_names,
        is_freebie: null,
        discount: item.discount_percent,
        giftimageset: false,
        gift_wrap: item.gift_wrap,
        special_price: 0,
        net_price: item.selling_price,
        unit_price: item.max_retail_price,
        is_available: true,
        category_details: [],
        color: item.color,
        color_family: "",
        brand: item.brand,
        is_deliverable: item.is_deliverable,
        assembly_service: false,
        couponDiscount: 0,
        demo_product: item.demo_product,
        offer_message: item.offer_message
      }
    };
  });
  return arr;
};

export const formatCartSummary = data => {
  return {
    cartEmiDetail: data.cartEmiDetail,
    items: data.itemsTotal,
    savings: data.savings,
    coupon_discount: data.couponDiscount,
    shipping_charges: data.shippingCharges,
    total: data.total,
    coupon: data.couponCode,
    items_count: data.itemsCount,
    combined_set_discount: data.comboDiscount,
    gift_wrap_amount: data.giftWrapAmount,
    is_gift_wrap_applied: data.isGiftWrapApplied
  };
};

export const formatPackageItems = data => {
  const cartItems = Object.values(data);
  const arr = cartItems.map(item => {
    return {
      image: item.image_url,
      name: item.name,
      simpleSku: item.sku,
      is_deliverable: item.is_deliverable,
      qty: item.qty
    };
  });
  return arr;
};
