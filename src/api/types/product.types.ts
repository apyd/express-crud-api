import type { UUID } from "node:crypto";

export type ProductId = UUID;

export type Product = {
    id: ProductId;
    title: string;
    description: string;
    price: number;
}