import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useState, useContext, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string] : any;
};

export const CartContextProvider = (props: Props) =>{
    
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);

    useEffect(() =>{
        const cartItems: any = localStorage.getItem('eShopCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);
        setCartProducts(cProducts);
    }, [])
    
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev){
                updatedCart = [...prev, product];
            } else {
                updatedCart = [product];
            }

            toast.success("Produto adicionado ao carrinho");
            
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const handleRemoveProductFromCart = useCallback(
        (product: CartProductType) =>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter
            ((item) => {
                return item.id !== product.id;
            });

            setCartProducts(filteredProducts)
            toast.success("Produto Removido");
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        }
    }, [cartProducts]
    );

    const handleCartQtyIncrease = useCallback(
        (product: CartProductType) => {
        let updatedCart;

        if(product.quantity === 99){
            return toast.error("Opps! Limite máximo");
        }

        if(cartProducts){
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = 
                ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleCartQtyDecrease = useCallback(
        (product: CartProductType) => {
        let updatedCart;

        if(product.quantity === 1){
            return toast.error("Opps! Limite Minimo");
        }

        if(cartProducts){
            updatedCart = [...cartProducts]
            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity = 
                --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        }
    }, [cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eShopCartItems', JSON.stringify(null));
    }, [cartProducts])
    
    const value = {
        cartTotalQty,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
    };

    return <CartContext.Provider value={value} {...props}/>;
};

export const useCart = () =>{
    const context = useContext(CartContext);
    if(context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context
};