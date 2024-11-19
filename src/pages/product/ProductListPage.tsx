// src/pages/product/ProductListPage.tsx
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { ProductTable } from "../../components/product/ProductTable";
import { ProductForm } from "../../components/product/ProductForm";
import { Product } from "../../types/product";
import { productsApi } from "../../lib/api/products";
import { size } from "lodash";
export const ProductListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);

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

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button color="purple" onClick={handleAdd}>
          Add New Product
        </Button>
      </div>

      <ProductTable onEdit={handleEdit} products={products} />

      <Modal
        show={showModal}
        onClose={handleClose}
        className="bg-slate-300 bg-opacity-50 backdrop-blur-sm"
      >
        <Modal.Header>
          {selectedProduct ? "Edit Product" : "Add New Product"}
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            // product={selectedProduct}
            onSubmit={handleClose}
            onCancel={handleClose}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
