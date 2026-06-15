
import AddCustomerModal from "./addCustomerModal";

export default function Header() {
    return (
        <header className="mx-5 mb-5">
            <h1 className="title">مشتریان</h1>
            <div className="flex justify-between gap-3">
                <AddCustomerModal  />
                
            </div>
        </header>
    );
}
