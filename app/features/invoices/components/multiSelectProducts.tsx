import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";
import type { Product } from "@/features/products/types/product";

import { Label } from "../../../components/ui/label";

type MultiSelectProps = {
    selectedItems: number[];
    setSelectedItems: (items: number[]) => void;
    products: Product[];
};

export default function MultiSelectProducts({
    selectedItems,
    setSelectedItems,
    products,
}: MultiSelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label>انتخاب کالاها</Label>

            <MultiSelect
                values={selectedItems.map(String)}
                onValuesChange={(vals) => {
                    setSelectedItems(vals.map(Number));
                }}
            >
                <MultiSelectTrigger className="w-full hover:bg-primary-foreground bg-primary-foreground">
                    <MultiSelectValue
                        placeholder="کالا رو جستجو کن"
                        overflowBehavior="wrap"
                    />
                </MultiSelectTrigger>

                <MultiSelectContent search>
                    <MultiSelectGroup>
                        {products.map((product) => (
                            <MultiSelectItem
                                key={product.id}
                                value={String(product.id)}
                            >
                                {product.name}
                            </MultiSelectItem>
                        ))}
                    </MultiSelectGroup>
                </MultiSelectContent>
            </MultiSelect>
        </div>
    );
}
