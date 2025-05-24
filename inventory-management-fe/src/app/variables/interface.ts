  export interface SignIn {
    username: string;
    password: string;
  }

  export interface SignUp {
    username: string;
    password: string;
    role_id: number;
  }
  
  export interface Product {
    id: number;
    name: string;
    product_code: string;
    quantity: number;
    price: number;
    description: string;
  }
  
  export type ProductArray = Product[];
  
