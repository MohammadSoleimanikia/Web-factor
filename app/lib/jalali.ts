import dayjs from "dayjs";
import jalaliday from "jalaliday";

export function toJalali(date: string) {
dayjs.extend(jalaliday);
const faDate = dayjs(date).calendar("jalali").locale("fa").format("YYYY/MM/DD");
return faDate;
}
