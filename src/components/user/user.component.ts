import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users:User[]=[]
  
  constructor(private userService:UserService,private cartService:CartService){}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    return this.userService.getAll().subscribe(result=>{
      this.users=result;
    })
  }
  selectUser(user:User){
    this.cartService.setSelectedUser(user);
  }
  getSelectedUser():User|undefined{
    return this.cartService.getSelectedUser();
  }
}
