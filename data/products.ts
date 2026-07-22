export type ProductOption = {
  label: string;
  value: string;
  color?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price?: number;
  status: "available" | "sold-out";
  images: string[];
  imageAlt: string;
  optionLabel?: string;
  options?: ProductOption[];
};

export const products: Product[] = [
  {
    id: "miracle-x-nicaso",
    name: "Miracle x Nicaso",
    category: "Drop 003 · Collaboration",
    price: 25,
    status: "available",
    images: [
      "/shop/products/miracle-x-nicasso/front-real.JPG",
      "/shop/products/miracle-x-nicasso/back-real.JPG",
    ],
    imageAlt: "Camiseta Miracle x Nicaso",
    optionLabel: "Talla",
    options: [
      { label: "S", value: "s" },
      { label: "M", value: "m" },
      { label: "L", value: "l" },
    ],
  },
  {
    id: "miracle-cap",
    name: "Miracle Cap",
    category: "Drop 002 · Headwear",
    price: 18,
    status: "available",
    images: ["/shop/products/cap/orange.jpg"],
    imageAlt: "Gorra Miracle en color taronja",
    optionLabel: "Color",
    options: [
      { label: "Taronja", value: "taronja", color: "#b75f45" },
      { label: "Azul fondo", value: "azul-fondo", color: "#17243a" },
    ],
  },
  {
    id: "first-miracle-shirt",
    name: "First Miracle T-shirt",
    category: "Drop 001 · Archive",
    status: "sold-out",
    images: ["/shop/products/first-shirt/sold-out.jpg"],
    imageAlt: "Primera camiseta Miracle",
  },
];
