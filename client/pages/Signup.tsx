import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api, setSession } from "@/lib/api";
import { useNavigate } from "react-router-dom";

const schema = z
  .object({
    name: z
      .string()
      .min(20, "Name must be 20–60 characters")
      .max(60, "Name must be 20–60 characters"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password 8–16 chars")
      .max(16, "Password 8–16 chars")
      .regex(/[A-Z]/, "Include an uppercase letter")
      .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Include a special character"),
    role: z.enum(["user", "owner"]),
    storeName: z.string().optional(),
    storeAddress: z.string().max(400, "Address ≤ 400 chars").optional(),
  })
  .refine(
    (data) =>
      data.role === "owner"
        ? Boolean(data.storeName && data.storeAddress)
        : true,
    {
      path: ["storeName"],
      message: "Store name and address required for owners",
    },
  );

export default function Signup() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { role: "user" },
  });
  const role = watch("role");

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const res = await api.post("/auth/signup", values);
    const { token, role } = res.data as { token: string; role: string };
    setSession(token, role);
    if (role === "owner") nav("/owner");
    else nav("/dashboard");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-muted-foreground">
          Join to browse stores and leave ratings.
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <Input placeholder="Full name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Input placeholder="Email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            {...register("role")}
          >
            <option value="user">Normal User</option>
            <option value="owner">Store Owner</option>
          </select>
        </div>
        {role === "owner" && (
          <>
            <div>
              <Input placeholder="Store name" {...register("storeName")} />
              {errors.storeName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.storeName.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Textarea
                placeholder="Store address"
                {...register("storeAddress")}
              />
              {errors.storeAddress && (
                <p className="text-sm text-destructive mt-1">
                  {errors.storeAddress.message}
                </p>
              )}
            </div>
          </>
        )}
        <Button type="submit" className="sm:col-span-2" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a className="text-primary underline" href="/login">
          Sign in
        </a>
      </p>
    </div>
  );
}
