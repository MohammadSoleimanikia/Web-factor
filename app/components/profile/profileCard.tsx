import { useEffect, useState } from "react";
import EditProfileModal from "./editProfileModal";
import type { User } from "@/types/user";
import { apiFetch } from "@/lib/api";

export default function ProfileCard() {
    const [profile, setProfile] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(1);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiFetch("/account/profile/");
                setProfile(data);
            } catch (err) {
                console.error("error fetching profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [reload]);

    if (loading) return <p>در حال بارگذاری...</p>;
    if (!profile) return <p>پروفایل پیدا نشد</p>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">پروفایل کاربری</h2>

                <EditProfileModal profile={profile} setReload={setReload} />
            </div>

            <div className="space-y-4 gap-5 grid md:grid-cols-2 lg:grid-cols-3">
                <div >
                    <label className="block text-sm font-medium text-gray-700">
                        نام
                    </label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.first_name } {profile.last_name}  
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        شماره تماس
                    </label>
                    <p className="bg-muted rounded-sm p-2">{profile.phone_number || "-"}</p>
                </div>


                <div >
                    <label className="block text-sm font-medium text-gray-700">
                        نام فروشگاه
                    </label>
                    <p  className="bg-muted rounded-sm p-2">{profile.store_name || "-"}</p>
                </div>
                <div >
                    <label className="block text-sm font-medium text-gray-700">
                        توضیحات فروشگاه
                    </label>
                    <p  className="bg-muted rounded-sm p-2">{profile.store_description || "-"}</p>
                </div>
                <div  >
                    <label className="block text-sm font-medium text-gray-700">
                        آدرس فروشگاه
                    </label>
                    <p  className="bg-muted rounded-sm p-2">{profile.store_address || "-"}</p>
                </div>
                <div >
                    <label className="block text-sm font-medium text-gray-700">
                        آدرس اینستاگرام
                    </label>
                    <p className="bg-muted rounded-sm p-2">{profile.insta_link || "-"}</p>
                </div>
                <div >
                    <label className="block text-sm font-medium text-gray-700">
                        تاریخ عضویت
                    </label>
                    <p className="bg-muted rounded-sm p-2">{profile.date_joined || "-"}</p>
                </div>
            </div>

        </div>
    );
}
