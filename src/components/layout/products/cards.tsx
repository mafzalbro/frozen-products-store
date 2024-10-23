import { FrozenProduct } from "@/types/index";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/cart-context"; // Import the Cart context hook
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Badge } from "../../ui/badge";

interface ProductCardProps {
  product: FrozenProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity,
      slug: product.slug,
    });
  };

  return (
    <div className="p-2 w-full sm:w-2/4 md:w-1/3 lg:1/4">
      <div className="border p-4 rounded-lg">
        <Image
          width={640}
          height={360}
          src={product.image_url}
          alt={product.name}
          className="h-40 w-full object-cover rounded-md"
        />
        <Badge variant="secondary" className="font-semibold">
          ${product.price}
        </Badge>
        <Link href={`/products/${product.slug}`} passHref className="hover:text-blue-500">
          <h2 className="text-2xl font-bold mt-2">{product.name}</h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-400 text-sm py-2">{product.description}</p>

        {/* Quantity Selector */}
        <div className="mt-2 flex items-center">
          <Label className="mr-2">Quantity:</Label>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded-md w-16 px-2"
          />
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="py-2 px-4 rounded-md mt-4"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
