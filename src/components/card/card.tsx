import Wardrobe from "../../assets/images/wardrobe.png";
import { get } from "lodash";
import classNames from "classnames";
interface CardProps {
  data?: any;
  className?: string;
  type?: "most-ordered" | "detail" | "regular";
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  data,
  className,
  type = "regular",
  onClick,
}) => {
  const image = get(data, "image", "") || Wardrobe;
  const rawPrice = get(data, "price", 0);
  const price =
    typeof rawPrice === "number" && !isNaN(rawPrice)
      ? rawPrice.toLocaleString()
      : 0;
  const name = get(data, "name", "Jeans");
  const renderInfo = () => {
    if (type === "most-ordered") {
      return (
        <>
          <h3 className="text-lg font-semibold">Dry Cleaning</h3>
          <p className="mt-1 text-sm">12x | total of $4,000</p>
        </>
      );
    }
    if (type === "detail") {
      return <></>;
    }
    if (type === "regular") {
      return (
        <>
          <h3 className="text-xs">Dry Cleaning</h3>
          <h3 className="text-lg font-semibold text-wrap truncate w-full">
            {name}
          </h3>
          <p className="text-sm">${price}/pc</p>
        </>
      );
    }
  };
  return (
    <div
      className={classNames(
        "relative bg-blue-100 shadow-md overflow-hidden h-full w-full",
        className
      )}
      onClick={onClick}
    >
      <img src={image} alt={name} className="w-full h-full object-cover" />

      {/* Konten Overlay */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#2D9CDB] to-transparent p-4 text-white h-[70%] flex flex-col justify-end">
        {renderInfo()}
      </div>
    </div>
  );
};

export default Card;
