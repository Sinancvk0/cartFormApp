import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import Swal from 'sweetalert2'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private selectedUser!:User
  private cartList:Cart[]=[]
  totalPrice: number | undefined = 0;
  totalAmount: number | undefined = 0;
  constructor(){ 
  }

  getSelectedUser():User|undefined{
    return this.selectedUser;
  }
  setSelectedUser(user:User){
    this.selectedUser=user;
    if(this.getUserCart()==undefined){
      this.cartList.push({userId:user.id,id:this.cartList.length+1,items:[]})
    }

    Swal.fire({
      position: "top-end",
      title: 'Selected User',
      text: user.fullName+' is selected for shop',
      showConfirmButton:false,
      timer:1500
    })
  }
  getUserCart():Cart|undefined{
    return this.cartList.find(cart=>cart.userId==this.selectedUser.id)
  }
  addProductInCart(product:Product){
    let cart=this.getUserCart();
    
 
    if(cart==undefined){
      Swal.fire({
        position: "top-end",
        title: 'Uups',
        text: 'Please select user.',
        icon:'error',
        showConfirmButton:false,
        timer:1500
      })
      return;
    }
    let cartItem=cart.items.find(item=>item.productId==product.id);
 
    if(cartItem==undefined){
      cartItem={
        cartId:cart.id,
        productId:product.id,
        count:0,
        productName:product.name,
        productPrice:product.price
   
      };
      cart.items.push(cartItem)
    }
    cartItem.count++;
    Swal.fire({
      position: "top-end",
      title: 'Added product',
      text: product.name+' added in cart',
      showConfirmButton:false,
      timer:1500
    })
    // this.notifierService.notify('Added product',product.name+' added in cart');
  }
  ziadatratib(id: number) {
    let cart = this.getUserCart();
    let product = cart?.items.find((item) => item.productId == id);
    if (product) {
      product.count++;
      this.calcQuantity();
    
    }
  }

  decrement(id: number) {
    let cart = this.getUserCart();
    let product = cart?.items.find((item) => item.productId == id);
    if (product && product.count > 1) product.count--;
    else (cart!.items as unknown) = cart?.items.filter((p) => p.productId !== id);

  }

  calcQuantity() {
    this.totalAmount = this.getUserCart()?.items.reduce((amount, currentvalue) => currentvalue.count + amount, 0);
  }

  calcTotalPrice() {
    this.totalPrice = this.getUserCart()?.items.reduce((amount, currentvalue) => currentvalue.productPrice * currentvalue.count + amount, 0);
  }

  removeItem(id: number) {
    let cart = this.getUserCart();
    (cart!.items as unknown) = cart?.items.filter((p) => p.productId !== id);
  }

  calculations() {
    this.calcQuantity();
    this.calcTotalPrice();
    localStorage.setItem("cartList", JSON.stringify(this.cartList));
  }


}
