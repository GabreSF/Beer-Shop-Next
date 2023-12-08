"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";

const CartClient = () => {
    const { cartProducts, handleClearCart } = useCart()

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex flex-col items-center">
                <div className="text-2xl">Seu carrinho está vazio</div>
                <div>
                    <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                        <MdArrowBack />
                        <span>Comece a comprar</span>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Heading title="Carrinho de compras" center />
            <div className="grid grid-cols-4 text-xs gap-4 pb-2 items-center">
                <div className="cols-span-2 justify-self-start">Produto</div>
                <div className="justify-self-center text-right">Preço</div>
                <div className="justify-self-center text-right">Quantidade</div>
                <div className="justify-self-end">Total</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((item) => {
                    return <ItemContent key={item.id} item={item} />;
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[90px]">
                    <Button label="Limpar Carrinho" onClick={() => {handleClearCart()}} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div>
                        <div className="flex justify-between w-full text-base font-semibold">
                            <span>Subtotal</span>
                            <span>$1,000</span>
                        </div>
                        <p className="text-slate-500">Impostos e frete calculados na finalização da compra</p>
                        <Button label="Confirmar" onClick={() => { }} />
                        <Link href={"/"} className="text-slate-500 flex items-center gap-1 mt-2">
                            <MdArrowBack />
                            <span>Continue a comprar</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartClient;