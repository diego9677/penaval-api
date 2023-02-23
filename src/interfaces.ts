
export interface UserLogged {
  id: number;
  email: string;
  roleId: number;
}

export interface ShoppingProducts {
  productCode: string;
  productId: number;
  pucharsePrice: number;
  salePrice: number;
  quantity: number;
}

export interface SaleProducts {
  productCode: string;
  productId: number;
  salePrice: number;
  quantity: number;
}