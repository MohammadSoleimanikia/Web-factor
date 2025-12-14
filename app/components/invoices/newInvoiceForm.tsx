import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectGroup,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";
import { Label } from "../ui/label";

export default function NewInvoiceForm() {
    return (
        <>
            <div className="flex flex-col gap-2">
        <Label>Frameworks</Label>
        <MultiSelect
          defaultValues={[
            "next.js",
            "sveltekit",
            "nuxt.js",
            "remix",
            "astro",
            "vue",
          ]}
        >
          <MultiSelectTrigger className="w-full">
            <MultiSelectValue overflowBehavior={"wrap"} />
          </MultiSelectTrigger>
          <MultiSelectContent>
            <MultiSelectGroup>
              <MultiSelectItem value="next.js">Next.js</MultiSelectItem>
              <MultiSelectItem value="sveltekit">SvelteKit</MultiSelectItem>
              <MultiSelectItem value="nuxt.js">Nuxt.js</MultiSelectItem>
              <MultiSelectItem value="remix">Remix</MultiSelectItem>
              <MultiSelectItem value="astro">Astro</MultiSelectItem>
              <MultiSelectItem value="vue">Vue.js</MultiSelectItem>
              <MultiSelectItem value="react">React</MultiSelectItem>
            </MultiSelectGroup>
          </MultiSelectContent>
        </MultiSelect>
      </div>
        </>
    );
}
