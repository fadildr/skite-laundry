import { useEffect, useState } from "react";
import LaundryImage from "../../assets/images/laundry.png";
import { FaRegStickyNote, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import Card from "../../components/card/card";
import { useNavigate } from "react-router-dom";
import { first, get, size } from "lodash";
import { useAuth } from "../../context/AuthContext";
import { productsApi } from "../../lib/api/products";
import { Spinner } from "flowbite-react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { user, isLoading } = useAuth();
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const userName = get(user, "name", "");

  const getProducts = async () => {
    try {
      const result: any = await productsApi.getProducts();
      if (size(result)) {
        setProducts(result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoadingProduct(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const navigate = useNavigate();
  const handleClick = (data: any) => {
    const id = get(data, "id");
    navigate(`/detail/${id}`);
  };
  if (isLoading) {
    return <Spinner aria-label="Extra large spinner example" size="xl" />;
  }
  return (
    <div className="bg-[#E7F5FD] pb-10 relative">
      {user && (
        <Link
          to="/dashboard"
          className="absolute top-4 right-4  text-white  transition z-50"
        >
          Dashboard
        </Link>
      )}

      <div>
        <div className="relative bg-[#F36868] w-full md:h-[250px] h-[200px] rounded-b-[50%] overflow-hidden flex items-center justify-center z-0"></div>
        <div className="absolute top-[80px] left-[50%] transform -translate-x-[50%] text-white text-xl z-20 text-[21px] font-semibold w-[80%]">
          Welcome, {userName}
        </div>
        <div className="absolute top-[120px] left-[50%] transform -translate-x-[50%] bg-white w-[80%] h-[150px] rounded-lg shadow-lg flex items-center justify-between p-5 z-20">
          <div className="flex items-center space-x-2">
            <div className="bg-[#2D9CDB] rounded-full w-[100px] h-[100px] "></div>
            <div className="bg-[#F36868] rounded-full w-4 h-4"></div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Your Balance</div>
            <div className="text-3xl text-[#3498db] font-bold">$200.00</div>
          </div>
        </div>
      </div>
      <div className="mt-28 w-[80%] mx-auto flex flex-col gap-10">
        <div className=" ">
          <p className="text-2xl text-[#2D9CDB] mb-2">Previous Order</p>
          <div className="flex w-full p-0 ">
            <div className="flex  items-center justify-around bg-white p-0 w-[70%]  ">
              <img
                src={LaundryImage}
                alt="Laundry"
                className="w-20 h-20 object-cover"
              />
              <div className="flex flex-col justify-between h-[75%] ">
                <p className="font-medium">Bag of Laundry</p>
                <div>
                  <p className="text-gray-500 text-sm">Total Order</p>
                  <p className="text-lg font-bold text-[#3498db]">$180.00</p>
                </div>
              </div>
            </div>
            <div className="bg-[#2D9CDB] text-white h-[100%] w-[30%] flex items-center justify-center p-6">
              <div className="flex flex-col items-center">
                <FaRegStickyNote size={45} className="font-bold" />
                <p>INVOICE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="text-2xl text-[#2D9CDB] mb-2">Your Most Ordered</p>
          <div className="w-[302px] h-[214px]">
            <Card
              className="rounded-lg"
              type="most-ordered"
              data={first(products)}
              onClick={() => handleClick(first(products))}
            />
          </div>
        </div>
        {isLoadingProduct ? (
          <div className="flex items-center justify-center">
            <Spinner aria-label="Extra large spinner example" size="xl" />
          </div>
        ) : (
          <div className="">
            <p className="text-2xl text-[#2D9CDB] mb-2">Our Latest Product</p>
            <div className="flex gap-5 overflow-x-auto w-full scrollbar-hide">
              {products.map((item, index) => (
                <div key={index} className="w-[176px] h-[214px] flex-shrink-0">
                  <Card
                    className="rounded-lg"
                    data={item}
                    onClick={() => handleClick(item)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        className="fixed bottom-20 right-20 bg-[#3498db] text-white p-4 rounded-full shadow-lg flex items-center justify-center hover:bg-[#2D9CDB] transition"
        onClick={() => navigate("/order")}
      >
        <FaShoppingCart size={20} />
      </button>
    </div>
  );
}
