// src/components/product/ProductTable.tsx
import { Table, Button } from "flowbite-react";
import { productsApi } from "../../lib/api/products";

// src/components/product/ProductTable.tsx
export const ProductTable = ({ onEdit, products }: any) => {
  return (
    <Table className="bg-transparent">
      {" "}
      <Table.Head className="bg-transparent">
        {" "}
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>SKU</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Stock</Table.HeadCell>
        <Table.HeadCell>Actions</Table.HeadCell>
      </Table.Head>
      <Table.Body className="bg-transparent">
        {" "}
        {products && products.length > 0 ? (
          //@ts-ignore
          products.map((product) => (
            <Table.Row
              key={product.id}
              className="bg-transparent hover:bg-gray-50"
            >
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.sku}</Table.Cell>
              <Table.Cell>${product.price}</Table.Cell>
              <Table.Cell>{product.stock}</Table.Cell>
              <Table.Cell className="flex gap-2">
                <Button size="sm" color="blue" onClick={() => onEdit(product)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="failure"
                  onClick={() => productsApi.delete(product.id)}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={5} className="text-center">
              No products available
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
