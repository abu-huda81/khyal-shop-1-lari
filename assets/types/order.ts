import { Product } from './product';

export type OrderStatus = 'Pending' | 'Completed' | 'Shipped' | 'InTransit';

export type Order = {
  [x: string]: string | number | Date;
  id: string;
  slug: string;
  item: string;
  details: string;
  status: OrderStatus;
  date: string;
  items: Product[];
};
