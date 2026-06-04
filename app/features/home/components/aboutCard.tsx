import { motion } from "motion/react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/features/shared/components/ui/card";
type AboutCardProps = {
    title: string;
    url: string;
    description: string;
};
export default function AboutCard({ title, url, description }: AboutCardProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
            }}
        >
            <Card className="h-full dark:bg-gray-700">
                <CardHeader>
                    <img
                        src={url}
                        alt="about section picture"
                        className="size-10 md:size-16 lg:size-20"
                    />
                    <CardTitle className="text-primary">{title}</CardTitle>
                </CardHeader>
                <CardContent>{description}</CardContent>
            </Card>
        </motion.div>
    );
}
