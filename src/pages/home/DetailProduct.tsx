import { useState, useEffect } from "react";
import Card from "../../components/card/card";
import Badge from "../../components/badge";
import { get } from "lodash";
import { productsApi } from "../../lib/api/products";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { category as mapCategory } from "../../constants";
// Define types for the product and cart item
type Product = {
  id: number;
  name: string;
  description: string;
  sku: string;
  stock: number;
  category_id: string;
  price: number;
  user_id: number;
  image: string;
  active: number;
  created_at: string;
  updated_at: string;
};

type CartItem = Product & {
  quantity: number;
};

const DetailProduct: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [product, setProduct] = useState<Product | {}>({});
  const [isLoading, setIsLoading] = useState(true);
  const id = get(useParams(), "id", 0) as number;
  const name = get(product, "name", "") as string;
  const price = get(product, "price", 0) as number;
  const description = get(product, "description", "") as string;
  const stock = get(product, "stock", 0) as number;
  const totalPrice = price * quantity;

  const category = mapCategory[get(product, "category_id", "4") as string];

  const getProductDetail = async () => {
    try {
      const res = await productsApi.getProductDetail(id);
      setProduct(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    const cartItem: any = {
      ...product,
      quantity,
    };

    const currentCart: CartItem[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === cartItem.id
    );
    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += quantity;
    } else {
      currentCart.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));

    setQuantity(0);
    alert("Item added to cart!");
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-[#E7F5FD] min-h-[100vh] flex items-center justify-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  }
  return (
    <div className="bg-[#E7F5FD] min-h-[100vh] pb-20">
      <div className="h-[50vh]">
        <Card className={"rounded-b-3xl"} data={product} type="detail" />
      </div>
      <div className="p-4 mt-3">
        <Badge text={category} />
        <p className="text-5xl mt-5 font-medium text-[#3B97CB]">{name}</p>
        <p className="text-3xl mt-3 text-[#0099EE]">$ {price.toFixed(2)}/pc</p>
        <p className="mt-3 text-[#838383] text-base">{description}</p>
      </div>

      {/* Fixed Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setQuantity(quantity - 1)}
            className="bg-blue-100 text-blue-500 text-3xl flex items-center justify-center rounded-full h-10 w-10 disabled:bg-slate-300 disabled:text-slate-100"
            disabled={quantity <= 0}
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            className="w-16 text-center border border-blue-100 text-lg"
            readOnly
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-blue-100 text-blue-500 text-3xl flex items-center justify-center rounded-full h-10 w-10 disabled:bg-slate-300 disabled:text-slate-100"
            disabled={quantity >= stock}
          >
            +
          </button>
        </div>
        {!!quantity && (
          <div className="flex justify-between items-center w-full">
            <div>$ {totalPrice.toFixed(2)}</div>
            <button
              onClick={handleAddToCart}
              className="bg-[#3B97CB] text-white px-6 py-3 rounded-lg text-xl"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProduct;
