export type Product = {
    id: number;
    name: string;
    description: string;
    last_buy_price: number;
    price: number;
    barcode: string;
    stock_quantity: number;
};
export type ProductCreate = Omit<Product, "id">;
export type PaginatedProductList = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: Product[];
};
