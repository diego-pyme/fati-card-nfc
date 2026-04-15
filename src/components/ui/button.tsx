import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-[20px] px-4 text-center text-[0.92rem] font-semibold tracking-[-0.01em] transition-all duration-200",
  {
    variants: {
      variant: {
        primary:
          "text-[#06101e] shadow-[0_16px_32px_rgba(74,143,255,0.22)] hover:-translate-y-[1px] hover:shadow-[0_18px_36px_rgba(74,143,255,0.26)] [background-image:linear-gradient(135deg,#9755ff_0%,#4a8fff_48%,#22d7f6_100%)]",
        secondary:
          "border border-white/10 bg-white/[0.035] text-white/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] hover:-translate-y-[1px] hover:bg-white/[0.05]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export function buttonClassName({
  className,
  variant,
}: ButtonVariants & { className?: string }) {
  return cn(buttonVariants({ variant }), className);
}
