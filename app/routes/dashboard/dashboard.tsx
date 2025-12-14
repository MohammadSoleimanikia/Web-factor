export default function Dashboard() {
    return (
        <div className="text-right ">
            <h1 className="font-semibold text-4xl">اطلاعات کلی</h1>
            <p>در این قسمت اطلاعات آماری اضافه می‌شود.</p>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
                tempore eum eaque, sit est blanditiis tenetur placeat? Eaque
                molestias repudiandae debitis quae placeat! Molestias atque
                repellendus magni ipsa sapiente debitis?
            </p>
            <div className="space-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="w-full h-20  bg-muted"/>
                <div className="w-full h-20  bg-primary"/>
                <div className="w-full h-20  bg-primary-foreground"/>
                <div className="w-full h-20  bg-secondary-foreground"/>
                <div className="w-full h-20  bg-secondary"/>
            </div>
        </div>
    );
}
