export interface DataFormAddGastoI {
  description: string;
  category: string;
  cant: number;
  price: number;
}

export interface StateFormAddI {
  data?: [];
  loading: boolean;
  error: boolean;
}
