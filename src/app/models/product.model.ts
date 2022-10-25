export interface Category {
  id:string;
  name:string;
  typeImg:string;
}

//trabajar con estos atributos en productos y que verifique  que tengamos todo de forma correcta
export interface Product{
  id:string;
  title:string;
  price:number;
  images:string[];
  category:Category;
  description:string;
}
export interface createProductDTO extends Omit<Product,'id'| 'category'>{
  categoryId:number;
}

export interface updateProductDTO extends Partial<createProductDTO>{

}


