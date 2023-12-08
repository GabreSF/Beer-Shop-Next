"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";


interface ProductDetailsProps {
    product: any;
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    image: string,
    quantity: number,
    price: number,
}

const Horizontal = () => {
    return <hr className="w-[65%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { handleAddProductToCart, cartProducts } = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        image: { ...product.image[0] },
        quantity: 1,
        price: product.price,
    });
    
    const router = useRouter()

    console.log(cartProducts);
    
    useEffect(() => {
        setIsProductInCart(false);

        if (cartProducts) {
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if (existingIndex > -1) {
                setIsProductInCart(true);
            }

        }
    }, [cartProducts]);

    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });

    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {
        if (cartProduct.quantity === 1) {
            return;
        }

        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1 };
        });

    }, [cartProduct]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage
                cartProduct={cartProduct}
                product={product}
                image={cartProduct.image[0]}
            />
            <div>
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="text-justify">
                    {product.description}
                </div>
                <Horizontal />
                {isProductInCart ? (
                    <>
                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle className="text-teal-400" size={20}/>
                        <span>Produto adicionado ao carrinho!</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button label="Ver carrinho" outline onClick={() => {
                            router.push("/cart");
                        }}/>
                    </div>
                    </>
                ) : (
                    <>
                        <SetQuantity
                            cartProduct={cartProduct}
                            handleQtyIncrease={handleQtyIncrease}
                            handleQtyDecrease={handleQtyDecrease}
                        />
                        <Horizontal/>
                        <div>
                            <span className="font-semibold">Categoria:</span> {product.category}
                        </div>
                        
                        <Horizontal />
                        <div className="max-w-[350px]">
                            <Button label="Adicionar" icon onClick={() =>
                                handleAddProductToCart(cartProduct)} />
                        </div>
                        
                        
                    </>
                )}

            </div>
        </div>
    );
};

export default ProductDetails;