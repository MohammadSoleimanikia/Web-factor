/**
 * Persian (Farsi) localization strings for the invoice application
 * Centralized i18n constants to maintain consistency across the app
 */

/* ============ PAGE TITLES ============ */
export const PAGE_TITLES = {
    CREATE_DEMO_INVOICE: "ایجاد فاکتور دمویی",
    VIEW_DEMO_INVOICE: "نمایش فاکتور دمویی",
} as const;

/* ============ COMMON LABELS ============ */
export const LABELS = {
    INVOICE_NUMBER: "شماره فاکتور",
    CREATED_DATE: "تاریخ ایجاد",
    CUSTOMER_INFO: "اطلاعات مشتری",
    CUSTOMER_NAME: "نام مشتری",
    ADDRESS: "آدرس",
    EMAIL: "ایمیل",
    PHONE: "شماره تلفن",
    ITEMS: "کالاها",
    PRODUCT_NAME: "نام محصول",
    QUANTITY: "تعداد",
    UNIT_PRICE: "قیمت واحد",
    ACTIONS: "عملیات",
    PAYMENT_STATUS: "وضعیت پرداخت",
    PAYMENT_METHOD: "روش پرداخت",
} as const;

/* ============ PLACEHOLDERS ============ */
export const PLACEHOLDERS = {
    INVOICE_NUMBER: "مثال: INV-001",
    CUSTOMER_NAME: "نام مشتری را وارد کنید",
    ADDRESS: "آدرس را وارد کنید",
    EMAIL: "ایمیل را وارد کنید",
    PHONE: "شماره تلفن را وارد کنید",
    PRODUCT_NAME: "نام محصول",
    QUANTITY: "1",
    UNIT_PRICE: "0",
    SELECT: "انتخاب کنید",
} as const;

/* ============ BUTTONS ============ */
export const BUTTON_LABELS = {
    SAVE_AND_PREVIEW: "ذخیره و مشاهده پیش‌نمایش",
    SAVE_AND_CONTINUE: "ذخیره و ادامه",
    SAVING: "در حال ذخیره...",
    ADD_PRODUCT: "اضافه کردن محصول",
    BACK_TO_HOME: "بازگشت به خانه",
    NEW_INVOICE: "فاکتور جدید",
    PRINT: "چاپ",
    DELETE: "حذف",
    CREATE_INVOICE: "ساخت فاکتور",
    EDIT_INVOICE: "ویرایش فاکتور",
} as const;

/* ============ MESSAGES ============ */
export const MESSAGES = {
    ERROR: {
        MIN_ONE_PRODUCT: "لطفاً حداقل یک محصول اضافه کنید",
        PRODUCT_NAME_REQUIRED: "نام محصول الزامی است",
        SAVE_ERROR: "خطا در ذخیره فاکتور",
        NOT_FOUND: "فاکتور پیدا نشد",
    },
    SUCCESS: {
        SAVED: "فاکتور با موفقیت ذخیره شد!",
    },
} as const;

/* ============ SECTIONS ============ */
export const SECTION_TITLES = {
    INVOICE_DETAILS: "جزئیات فاکتور",
    CUSTOMER_INFO: "اطلاعات مشتری",
    ITEMS: "کالاها و محصولات",
    PAYMENT_INFO: "اطلاعات پرداخت",
} as const;
