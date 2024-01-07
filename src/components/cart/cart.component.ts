import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { Product } from '../../models/product';
import { CartItem } from '../../models/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  selectedUser: User | undefined;




  constructor(public cartService: CartService) {
    this.selectedUser = this.cartService.getSelectedUser();

  }

}
