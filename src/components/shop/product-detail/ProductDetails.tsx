
import React from 'react';
import { Product } from '@/types/shop';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">상품 상세 정보</h2>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">제품명</TableCell>
            <TableCell>{product.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">제조사</TableCell>
            <TableCell>{product.manufacturer || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">유통사</TableCell>
            <TableCell>{product.distributor || '-'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">가격</TableCell>
            <TableCell>{product.price}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductDetails;
