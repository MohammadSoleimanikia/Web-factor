import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { motion } from "motion/react";
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
            <Card className="h-full">
                <CardHeader>
                    <img
                        src={url}
                        alt="about section picture"
                        className="size-10 md:size-16 lg:size-20"
                    />
                <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {description}
                </CardContent>
            </Card>
        </motion.div>
    );
}
