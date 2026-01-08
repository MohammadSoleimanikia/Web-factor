type Trends = {
    date: string;
    total: number;
};
type TopProducts = {
    product__name: string;
    quantity: number;
};
export type DashboardData = {
    total_invoice: number;
    total_revenue: number;
    outstanding_amount: number;
    pending_count: number;
    trends: Trends[];
    top_products: TopProducts[];
};
