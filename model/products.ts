interface Items {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  state_name: string;
}

interface ProductsMeli {
  author: {
    name: string;
    lastname: string;
  };
  categories?: string[];
  items?: Items[];
}

interface ProductDetail {
  author: {
    name: string;
    lastname: string;
  };
  item?: {
    id: string;
    title: string;
    price: {
      currency: string;
      amount: Number;
      decimals: Number;
    };
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;
  };
}

export { ProductsMeli, ProductDetail, Items };
