export interface IProduct {
  name: string;
  image: string;
  cat_id?: string;
  price: number;
  id?: number;
}
// export type IProductLite = Pick<IProduct,'title'|'thumbnail'|'price'>;
