"use client";

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCallback, useState } from "react";

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
    return <hr className="w-[65%] my-2"/>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        image: {...product.image[0]},
        quantity: 1,
        price: product.price,
    })

    const handleQtyIncrease = useCallback(() => {
        if(cartProduct.quantity === 99){
            return;
        }
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1 };
        });

    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() =>{
        if(cartProduct.quantity === 1){
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
        image={cartProduct.image}
        />
        <div>
            <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
            <div className="text-justify">
                {product.description}
            </div>
            <Horizontal/>
            <div>
                <span className="font-semibold">Categoria:</span> {product.category}
            </div>
            <Horizontal/>
            <SetQuantity
                cartProduct={cartProduct}
                handleQtyIncrease={handleQtyIncrease}
                handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal/>
            <div className="max-w-[350px]">
                <Button label="Adicionar" icon onClick={() => 
                {}}/>
            </div>
        </div>
    </div> 
    );
};
 
export default ProductDetails;