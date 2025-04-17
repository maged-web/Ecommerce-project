import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { ShippingEntity } from "./shipping.entity";
import { OrdersProductsEntity } from "./orders-products.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number
    @CreateDateColumn()
    orderAt: Timestamp

    @Column({type:'enum',enum: OrderStatus,default:OrderStatus.PROCESSING})
    status:string

    @Column({nullable:true})
    shippedAt:Date

    @Column({nullable:true})
    deliverdAt:Date

    @ManyToOne(()=>UserEntity,user=>user.ordersUpdateBy)
    updatedBy:UserEntity
    @OneToOne(()=>ShippingEntity,shipping=>shipping.order,{cascade:true})
    @JoinColumn()
    shippingAdress:ShippingEntity
    @OneToMany(()=>OrdersProductsEntity,ordersProducts=>ordersProducts.order,{cascade:true})
    products:OrdersProductsEntity[]

    @ManyToOne(()=>UserEntity,user=>user.orders)
    user:UserEntity
}
