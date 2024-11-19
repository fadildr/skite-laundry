// src/components/product/ProductForm.tsx
import { useState, useEffect, FormEvent } from "react";
import { TextInput, Textarea, Label, Button } from "flowbite-react";
import { Product } from "../../types/product";
import { productsApi } from "../../lib/api/products";

interface ProductFormProps {
  product?: Product;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ProductForm = ({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sku: "",
    stock: 0,
    price: 0,
    image: "",
    category_id: 1,
  });
  const [categories, setCategories] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getCategories = async () => {
    try {
      const result = await productsApi.getCategories();

      setCategories(result);
    } catch (error) {}
  };

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        await productsApi.update(product.id, formData);
      } else {
        await productsApi.create(formData);
      }
      onSubmit();
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    id: keyof typeof formData,
    label: string,
    type: "text" | "number" | "textarea" = "text",
    required: boolean = true
  ) => (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          value={formData[id] as string}
          onChange={(e) => handleInputChange(id, e.target.value)}
          required={required}
        />
      ) : (
        <TextInput
          id={id}
          type={type}
          value={formData[id] as string | number}
          onChange={(e) =>
            handleInputChange(
              id,
              type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          required={required}
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderInput("name", "Product Name")}
      {renderInput("description", "Description", "textarea")}
      <div className="grid grid-cols-2 gap-4">
        {renderInput("sku", "SKU")}
        {renderInput("stock", "Stock", "number")}
      </div>
      <div className="flex gap-2">
        {categories.map((item: any) => (
          <div
            className={`${
              item.id === formData.category_id
                ? "text-[#CAECFF] bg-[#0099EE]"
                : "bg-[#CAECFF] text-[#0099EE]"
            } 
                   text-xs p-2 rounded cursor-pointer`}
            onClick={() => handleInputChange("category_id", item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {renderInput("price", "Price", "number")}

      {renderInput("image", "Image URL")}

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="blue" type="submit" disabled={loading}>
          {loading
            ? "Saving..."
            : product
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
};
