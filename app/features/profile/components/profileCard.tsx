// features/profile/components/ProfileCard.tsx
import { useEffect, useState } from "react";

import type { User } from "@/features/auth/types/user.type";
import { SubscriptionStatus } from "@/features/subscription/components/SubscriptionStatus";
import { apiFetch } from "@/lib/api";
import { buildLogoUrl } from "@/lib/utils";
import useAuth from "@/store/auth";

import LoadingSpinner from "../../shared/components/ui/loadingSpinner";
import EditProfileModal from "./editProfileModal";

export default function ProfileCard() {
    const { setProfile } = useAuth();
    const [profile, setProfileState] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(1);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiFetch<User>("/account/profile/");
                setProfileState(data);
                setProfile(data);
            } catch (err) {
                console.error("error fetching profile", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [reload, setProfile]);

    if (loading) return <LoadingSpinner />;
    if (!profile) return <p>پروفایل پیدا نشد</p>;

    return (
        <div className="rounded-lg shadow-md p-6 space-y-6">
            {/* هدر */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">پروفایل کاربری</h2>
                <EditProfileModal profile={profile} setReload={setReload} />
            </div>

            {/* وضعیت اشتراک */}
            <SubscriptionStatus />

            {/* اطلاعات پروفایل */}
            <div className="space-y-4 gap-5 grid md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <label className="block text-sm font-medium">نام</label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.first_name} {profile.last_name || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        شماره تماس
                    </label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.phone_number || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        تاریخ عضویت
                    </label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.date_joined || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        نام فروشگاه
                    </label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.profile.store_name || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        توضیحات فروشگاه
                    </label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.profile.store_description || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        آدرس فروشگاه
                    </label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.profile.store_address || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        آدرس اینستاگرام
                    </label>
                    <p className="bg-muted rounded-sm p-2">
                        {profile.profile.insta_link || "-"}
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium">
                        رنگ برند
                    </label>
                    <div className="bg-muted rounded-sm p-2 flex items-center gap-2">
                        <div
                            className="w-6 h-6 rounded border"
                            style={{
                                backgroundColor: profile.profile.hexcolor,
                            }}
                        />
                        {profile.profile.hexcolor}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium">لوگو</label>
                    <div className="bg-muted rounded-sm p-2">
                        {profile.profile.logo ? (
                            <img
                                src={
                                    buildLogoUrl(
                                        profile.profile.logo,
                                        reload,
                                    ) || ""
                                }
                                alt="Logo"
                                className="w-16 h-16 object-contain"
                            />
                        ) : (
                            "-"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
