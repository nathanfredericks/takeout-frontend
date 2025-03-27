/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/register": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Register */
    post: operations["register_api_register_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/login": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get?: never;
    put?: never;
    /** Login */
    post: operations["login_api_login_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/me": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Current User Profile */
    get: operations["get_current_user_profile_api_me_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/merchants": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Merchants */
    get: operations["list_merchants_api_merchants_get"];
    put?: never;
    /** Create Merchant */
    post: operations["create_merchant_api_merchants_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/merchants/{merchant_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Merchant */
    get: operations["get_merchant_api_merchants__merchant_id__get"];
    put?: never;
    post?: never;
    /** Delete Merchant */
    delete: operations["delete_merchant_api_merchants__merchant_id__delete"];
    options?: never;
    head?: never;
    /** Update Merchant */
    patch: operations["update_merchant_api_merchants__merchant_id__patch"];
    trace?: never;
  };
  "/api/merchants/{merchant_id}/items": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Merchant Items */
    get: operations["list_merchant_items_api_merchants__merchant_id__items_get"];
    put?: never;
    /** Create Merchant Item */
    post: operations["create_merchant_item_api_merchants__merchant_id__items_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/merchants/{merchant_id}/items/{item_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Merchant Item */
    get: operations["get_merchant_item_api_merchants__merchant_id__items__item_id__get"];
    put?: never;
    post?: never;
    /** Delete Merchant Item */
    delete: operations["delete_merchant_item_api_merchants__merchant_id__items__item_id__delete"];
    options?: never;
    head?: never;
    /** Update Merchant Item */
    patch: operations["update_merchant_item_api_merchants__merchant_id__items__item_id__patch"];
    trace?: never;
  };
  "/api/orders": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Orders */
    get: operations["list_orders_api_orders_get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/orders/{order_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Order */
    get: operations["get_order_api_orders__order_id__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/merchants/{merchant_id}/orders": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** List Merchant Orders */
    get: operations["list_merchant_orders_api_merchants__merchant_id__orders_get"];
    put?: never;
    /** Create Order */
    post: operations["create_order_api_merchants__merchant_id__orders_post"];
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  "/api/merchants/{merchant_id}/orders/{order_id}": {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    /** Get Merchant Order */
    get: operations["get_merchant_order_api_merchants__merchant_id__orders__order_id__get"];
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    /** Update Order Status */
    patch: operations["update_order_status_api_merchants__merchant_id__orders__order_id__patch"];
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: {
    /** HTTPValidationError */
    HTTPValidationError: {
      /** Detail */
      detail?: components["schemas"]["ValidationError"][];
    };
    /** ItemCreateSchema */
    ItemCreateSchema: {
      /** Name */
      name: string;
      /** Description */
      description?: string | null;
      /** Price */
      price: number | string;
    };
    /** ItemReadSchema */
    ItemReadSchema: {
      /** Name */
      name: string;
      /** Description */
      description?: string | null;
      /** Price */
      price: string;
      /** Id */
      id: number;
      /** Merchant Id */
      merchant_id: number;
    };
    /** LoginSchema */
    LoginSchema: {
      /** Email */
      email: string;
      /** Password */
      password: string;
    };
    /** MerchantCreateSchema */
    MerchantCreateSchema: {
      /** Name */
      name: string;
      /** Description */
      description?: string | null;
      /** Location */
      location: string;
    };
    /** MerchantReadSchema */
    MerchantReadSchema: {
      /** Name */
      name: string;
      /** Description */
      description?: string | null;
      /** Location */
      location: string;
      /** Id */
      id: number;
      /** Partner Id */
      partner_id: number;
    };
    /** MerchantUpdateSchema */
    MerchantUpdateSchema: {
      /** Name */
      name?: string | null;
      /** Description */
      description?: string | null;
      /** Location */
      location?: string | null;
    };
    /** MerchantWithItemsSchema */
    MerchantWithItemsSchema: {
      /** Name */
      name: string;
      /** Description */
      description?: string | null;
      /** Location */
      location: string;
      /** Id */
      id: number;
      /** Partner Id */
      partner_id: number;
      /** Items */
      items: components["schemas"]["ItemReadSchema"][];
    };
    /** OrderCreateSchema */
    OrderCreateSchema: {
      /** Delivery Address */
      delivery_address: string;
      /** Order Instructions */
      order_instructions?: string | null;
      /**
       * Items
       * @default []
       */
      items: components["schemas"]["OrderItemCreateSchema"][];
    };
    /** OrderItemCreateSchema */
    OrderItemCreateSchema: {
      /** Item Id */
      item_id: number;
      /** Quantity */
      quantity: number;
    };
    /** OrderItemReadSchema */
    OrderItemReadSchema: {
      /** Item Id */
      item_id: number;
      /** Quantity */
      quantity: number;
      /** Id */
      id: number;
      item: components["schemas"]["ItemReadSchema"];
    };
    /** OrderReadSchema */
    OrderReadSchema: {
      /** Delivery Address */
      delivery_address: string;
      /** Order Instructions */
      order_instructions?: string | null;
      /** Id */
      id: number;
      /** Merchant Id */
      merchant_id: number;
      /** Merchant Name */
      merchant_name: string;
      /** Merchant Location */
      merchant_location: string;
      /** Consumer Id */
      consumer_id: number;
      /** Courier Id */
      courier_id?: number | null;
      /** Courier Name */
      courier_name?: string | null;
      status: components["schemas"]["OrderStatus"];
      /**
       * Created At
       * Format: date-time
       */
      created_at: string;
      /** Delivered At */
      delivered_at?: string | null;
      /** Items */
      items: components["schemas"]["OrderItemReadSchema"][];
      /** Total */
      total?: string | null;
    };
    /**
     * OrderStatus
     * @enum {string}
     */
    OrderStatus:
      | "pending"
      | "accepted"
      | "ready_for_pickup"
      | "in_transit"
      | "delivered"
      | "cancelled";
    /** OrderStatusUpdateSchema */
    OrderStatusUpdateSchema: {
      status: components["schemas"]["OrderStatus"];
    };
    /** Token */
    Token: {
      /** Access Token */
      access_token: string;
      /**
       * Token Type
       * @default bearer
       */
      token_type: string;
    };
    /** UserCreateSchema */
    UserCreateSchema: {
      /** Name */
      name: string;
      /** Email */
      email: string;
      /** Phone Number */
      phone_number: string;
      /** @default consumer */
      role: components["schemas"]["UserRole"];
      /** Password */
      password: string;
    };
    /** UserReadSchema */
    UserReadSchema: {
      /** Name */
      name: string;
      /** Email */
      email: string;
      /** Phone Number */
      phone_number: string;
      /** @default consumer */
      role: components["schemas"]["UserRole"];
      /** Id */
      id: number;
    };
    /**
     * UserRole
     * @enum {string}
     */
    UserRole: "consumer" | "partner" | "courier";
    /** ValidationError */
    ValidationError: {
      /** Location */
      loc: (string | number)[];
      /** Message */
      msg: string;
      /** Error Type */
      type: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
  register_api_register_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreateSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  login_api_login_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["Token"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_current_user_profile_api_me_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["UserReadSchema"];
        };
      };
    };
  };
  list_merchants_api_merchants_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MerchantReadSchema"][];
        };
      };
    };
  };
  create_merchant_api_merchants_post: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["MerchantCreateSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MerchantReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_merchant_api_merchants__merchant_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MerchantWithItemsSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  delete_merchant_api_merchants__merchant_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_merchant_api_merchants__merchant_id__patch: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["MerchantUpdateSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["MerchantReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  list_merchant_items_api_merchants__merchant_id__items_get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ItemReadSchema"][];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_merchant_item_api_merchants__merchant_id__items_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ItemCreateSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ItemReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_merchant_item_api_merchants__merchant_id__items__item_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
        item_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ItemReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  delete_merchant_item_api_merchants__merchant_id__items__item_id__delete: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
        item_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      204: {
        headers: {
          [name: string]: unknown;
        };
        content?: never;
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_merchant_item_api_merchants__merchant_id__items__item_id__patch: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
        item_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ItemCreateSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["ItemReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  list_orders_api_orders_get: {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["OrderReadSchema"][];
        };
      };
    };
  };
  get_order_api_orders__order_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        order_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["OrderReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  list_merchant_orders_api_merchants__merchant_id__orders_get: {
    parameters: {
      query?: {
        status?: components["schemas"]["OrderStatus"] | null;
      };
      header?: never;
      path: {
        merchant_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["OrderReadSchema"][];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  create_order_api_merchants__merchant_id__orders_post: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrderCreateSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["OrderReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  get_merchant_order_api_merchants__merchant_id__orders__order_id__get: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
        order_id: number;
      };
      cookie?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["OrderReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
  update_order_status_api_merchants__merchant_id__orders__order_id__patch: {
    parameters: {
      query?: never;
      header?: never;
      path: {
        merchant_id: number;
        order_id: number;
      };
      cookie?: never;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OrderStatusUpdateSchema"];
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["OrderReadSchema"];
        };
      };
      /** @description Validation Error */
      422: {
        headers: {
          [name: string]: unknown;
        };
        content: {
          "application/json": components["schemas"]["HTTPValidationError"];
        };
      };
    };
  };
}
