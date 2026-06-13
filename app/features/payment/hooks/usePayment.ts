// features/payment/hooks/usePayment.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { apiFetch } from "@/lib/api";

type PurchasePlanResponse = {
    gateway_url: string;
};

export function usePurchasePlan() {
    const queryClient = useQueryClient(); 
    
    return useMutation({
        mutationFn: async (planId: number) => {
            console.log("🟡 Sending purchase request for plan:", planId);

            const response = await apiFetch<PurchasePlanResponse>(
                "/account/purchaseplan/",
                {
                    method: "POST",
                    body: JSON.stringify({ plan_id: planId }),
                },
            );

            console.log("🟢 Gateway URL received:", response);
            return response;
        },
        onSuccess: (data) => {
            if (data.gateway_url) {
                window.location.href = data.gateway_url;
            } else {
                toast.error("آدرس درگاه پرداخت دریافت نشد");
            }
            queryClient.invalidateQueries({ queryKey: ["subscription"] });
        },
        onError: (error: any) => {
            console.error("🔴 Purchase error:", error);
            const message = error?.detail || error?.message || "خطا در درخواست پرداخت";
            toast.error(message);
        },
    });
}

type VerifyPaymentResponse = {
    authority: string;
    status: string;
    ref_id: string;
};

export function useVerifyPayment() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (authority: string) => {
            console.log("🟡 Verifying payment with authority:", authority);
            
            const response = await apiFetch<VerifyPaymentResponse>("/account/verifypayment/", {
                method: "POST",
                body: JSON.stringify({ authority }),
            });
            
            console.log("🟢 Verify response:", response);
            return response;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["subscription"] });
            
            if (data.status === "success") {
                toast.success(`پرداخت با موفقیت انجام شد! کد رهگیری: ${data.ref_id}`);
            } else {
                toast.error("پرداخت ناموفق بود");
            }
        },
        onError: (error: any) => {
            console.error("🔴 Verify error:", error);
            const message = error?.detail || error?.message || "خطا در تایید پرداخت";
            toast.error(message);
        },
    });
}