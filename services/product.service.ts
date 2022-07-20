import boom from "@hapi/boom";
import axios from "axios";
import { ProductsMeli, Items, ProductDetail } from "../model/products";

class ProductService {
  find = async (query: string): Promise<ProductsMeli> => {
    const productsMeli: ProductsMeli = {
      author: {
        name: "CARLOS DAVID",
        lastname: "TELLO RUIZ",
      },
    };
    const ApiProducts = `https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4&offset=0`;
    const ApiCurrency = (currency_id: string) =>
      `https://api.mercadolibre.com/currencies/${currency_id}`;
    try {
      const elements = await (await axios.get(ApiProducts)).data;
      const categories = elements.filters[0]?.values[0].path_from_root;
      productsMeli.categories = categories?.map(
        (item: { name: any }) => item.name
      );
      const items = elements.results.map(
        async (item: {
          currency_id: string;
          id: any;
          title: any;
          price: any;
          thumbnail: any;
          condition: any;
          shipping: { free_shipping: any };
          address: { state_name: any };
        }) => {
          const currencies = await (
            await axios.get(ApiCurrency(item.currency_id))
          ).data;
          const itemMeli: Items = {
            id: item.id,
            title: item.title,
            price: {
              currency: currencies.description,
              amount: item.price,
              decimals: currencies.decimal_places,
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            state_name: item.address.state_name,
          };
          return itemMeli;
        }
      );
      const result = await Promise.all(items).then((values) => {
        return values;
      });
      productsMeli.items = result;
    } catch (error) {
      console.log("error -->", error);
    }
    return productsMeli;
  };

  findOne = async (productId: string): Promise<ProductDetail> => {
    const productDetail: ProductDetail = {
      author: {
        name: "CARLOS DAVID",
        lastname: "TELLO RUIZ",
      },
    };

    const ApiDetail = `https://api.mercadolibre.com/items/${productId}`;
    const ApiCurrency = (currency_id: string) =>
      `https://api.mercadolibre.com/currencies/${currency_id}`;
    try {
      const item = await (await axios.get(ApiDetail)).data;
      const description = await (
        await axios.get(`${ApiDetail}/description`)
      ).data;
      const currencies = await (
        await axios.get(ApiCurrency(item.currency_id))
      ).data;
      const product = { ...item, ...description };
      productDetail.item = {
        id: item.id,
        title: item.title,
        price: {
          currency: currencies.description,
          amount: item.price,
          decimals: currencies.decimal_places,
        },
        picture: item.pictures[0].url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.plain_text,
      };
      if (!product) {
        throw boom.notFound("Product not Found");
      }
    } catch (error) {}

    return productDetail;
  };
}
export { ProductService };
