const BASE_URL = 'http://localhost:3000/api';

export const API_LIST = {

  // login component -api
  LOGIN_CREATE: `${BASE_URL}/users/register`,  
  LOGIN_VERIFY: `${BASE_URL}/users/login`,      

  // dashhboard - api
  PRODUCT_LIST: `${BASE_URL}/products`,         
  PRODUCT_CREATE: `${BASE_URL}/products`,       
  PRODUCT_UPDATE: (id: number) => `${BASE_URL}/products/${id}`,  
  PRODUCT_DELETE: (id: number) => `${BASE_URL}/products/${id}`  
};
