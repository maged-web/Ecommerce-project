import { Expose, Transform, Type } from "class-transformer";
import { title } from "process";

export class  ProductDto {
    @Expose()
    totalProducts: number;
    @Expose()
    limit: number;
    @Expose()
    @Type(()=>ProductsList)
    products:ProductsList[]
}

export class ProductsList {
    @Expose({name:'product_id'})
    id: number;
    @Expose({name:'product_title'})
    title: string;
    @Expose({name:'product_description'})
    description: string;
    @Expose({name:'product_price'})
    price: number;
    @Expose({name:'product_stock'})
    stock: number;
    @Expose({name:'product_image'})
    @Transform(({value})=>value.toString.split(','))
    image: string[];
    @Transform(({obj})=>{
        return {
            id:obj.category.id,
            title:obj.category.title
        }
    })
    @Expose()
    category: any;
    @Expose({name:'review_count'})
    review: number;
    @Expose({name:'avg_rating'})
    rating: number;
   
    
  }