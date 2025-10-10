import { useEffect, useMemo, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from "../../../Contexts/Cart/CartContext";
import type { Product, Topping } from "../../../types/cart.type";

type Props = {
    product: Product | null
    open: boolean;
    onClose: () => void;
};
export default function ProductOptionModal({ open, onClose, product }: Props) {
    const [selected, setSelected] = useState<Record<number, number | number[]>>({});
    const cart = useCart()

    const handlePickList = (groupId: number, itemId: number) => {
        setSelected((prev) => ({ ...prev, [groupId]: itemId }));
    };

    const handleToggleCheckbox = (groupId: number, itemId: number) => {
        setSelected((prev) => {
            const current = prev[groupId];
            const arr = Array.isArray(current) ? [...current] : [];
            const idx = arr.indexOf(itemId);
            if (idx >= 0) arr.splice(idx, 1);
            else arr.push(itemId);
            return { ...prev, [groupId]: arr };
        });
    };

    const total = useMemo(() => {
        if (!product) return 0;
        const extras = product.topping.reduce((sum, g) => {
            const sel = selected[g.id];
            if (!sel) return sum;
            if (g.type === "list") {
                const picked = g.detail.find(d => d.id === sel);
                return sum + (picked?.price ?? 0);
            } else {
                const arr = Array.isArray(sel) ? sel : [];
                return sum + arr.reduce((s, id) => {
                    const item = g.detail.find(d => d.id === id);
                    return s + (item?.price ?? 0);
                }, 0);
            }
        }, 0);

        return product.price + extras;
    }, [product, selected]);

    const addToCart = () => {
        const topping: Topping[] = (product?.topping ?? []).map((v) => {
            const sel = selected[v.id];

            if (!sel) return null;

            if (v.type === "list") {
                const item = v.detail.find((d) => d.id === sel);
                return {
                    id: v.id,
                    name: v.name,
                    type: v.type,
                    detail: [item]
                };
            } else {
                const arr = Array.isArray(sel) ? sel : [];
                const items = v.detail.filter((d) => arr.includes(d.id));
                return {
                    id: v.id,
                    name: v.name,
                    type: v.type,
                    detail: items
                };
            }
        }).filter(Boolean) as Topping[];

        const selectedProduct: Product = {
            ...product!,
            price: total,
            count : 1,
            topping: topping,
        };

        cart.addToCart(selectedProduct)
        onClose()

    }

    useEffect(() => {
        setSelected({})
    }, [open])

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-[100] flex justify-center items-center ">
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 w-[90%] max-w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden animate-in fade-in duration-200">
                <div className="flex items-center justify-between px-4 py-3 ">
                    <h2 className="text-xl sm:text-2xl font-extrabold">productName</h2>
                    <button
                        className="p-2 rounded-lg bg-zinc-100 hover:bg-red-100"
                        aria-label="close"
                        type="button"
                    >
                        <IoMdClose className="w-5 h-5" onClick={onClose} />
                    </button>
                </div>

                <div className="p-4 max-h-[50vh] overflow-y-auto ">
                    {product?.topping.map((levels) => (
                        <div
                            key={levels.id}
                            className="space-y-2 bg-zinc-100 p-4 my-2 rounded-2xl"
                        >
                            <h1 className="text-xl font-medium">{levels.name}</h1>

                            {levels.detail.map((detail) => {
                                const sel = selected[levels.id];
                                const checked =
                                    levels.type === "list"
                                        ? sel === detail.id
                                        : Array.isArray(sel) && sel.includes(detail.id);
                                return (
                                    <label
                                        key={detail.id}
                                        className="flex items-center gap-3 bg-white border rounded-xl px-3 py-2"
                                    >
                                        <input
                                            type={levels.type === "list" ? "radio" : "checkbox"}
                                            name={`group-${levels.id}`} // ใช้ groupId เดียวกัน
                                            className="size-4 accent-[#009D90]"
                                            checked={checked}
                                            onChange={() =>
                                                levels.type === "list"
                                                    ? handlePickList(levels.id, detail.id)
                                                    : handleToggleCheckbox(levels.id, detail.id)
                                            }

                                        />
                                        <div className="flex-1 flex justify-between text-sm">
                                            <span>{detail.name}</span>
                                            <span className="text-zinc-500">
                                                {detail.price !== 0 ? `+${detail.price} ฿` : "รวมในราคา"}
                                            </span>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    ))}

                </div>

                <div className="px-4 py-3 bg-white flex items-center justify-between">
                    <div className="text-lg font-extrabold">{total} บาท</div>
                    <button
                        onClick={() => { addToCart() }}
                        className="px-5 h-9 rounded-md bg-[#009D90] text-white font-bold text-sm active:scale-[0.97]"
                        type="button"
                    >
                        เพิ่ม
                    </button>
                </div>
            </div>
        </div>
    )
}