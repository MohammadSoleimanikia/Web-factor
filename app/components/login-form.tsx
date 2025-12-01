import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { Link } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LoginSchema, type LoginFormType } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormType>({
        resolver: zodResolver(LoginSchema),
    });
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    خوش آمدید
                                </h1>
                                <p className="text-muted-foreground text-balance">
                                    ورود به حساب کاربری
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">ایمیل</FieldLabel>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                                {errors.email && (
                                    <span className="text-red-500">
                                        {errors.email.message}
                                    </span>
                                )}
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">
                                        کلمه ی عبور
                                    </FieldLabel>
                                    <a
                                        href="#"
                                        className="ml-auto text-sm text-primary underline-offset-2 hover:underline"
                                    >
                                        (کلمه ی عبوررا فراموش کرده اید؟)
                                    </a>
                                </div>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    required
                                />
                                {errors.password && (
                                    <span className="text-red-500">
                                        {errors.password.message}
                                    </span>
                                )}
                            </Field>
                            <Field>
                                <Button disabled={isSubmitting} type="submit">
                                  {isSubmitting ? "در حال ورود..." : "ورود"}
                                  </Button>
                            </Field>

                            <FieldDescription className="text-center">
                                اکانتی ندارید ؟{" "}
                                <Link to={"/signup"}>ایجاد اکانت</Link>
                            </FieldDescription>
                        </FieldGroup>
                    </form>

                    <div className="bg-secondary relative hidden md:block">
                        <img
                            src="/login.svg"
                            alt="login picture"
                            className="absolute inset-0 h-full w-full  dark:brightness-[0.2] dark:grayscale p-5"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
