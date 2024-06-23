import { ReactNode } from "react";

export type Action = {
    label: string;
    icon?: ReactNode;
    color?: "primary" | "neutral" | "danger" | "success" | "warning";
    size?: "sm" | "md" | "lg";
    variant?: "plain" | "outlined" | "soft" | "solid";
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
};