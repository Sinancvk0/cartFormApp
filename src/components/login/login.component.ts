import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { LoginDto } from '../../models/login-dto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit , OnChanges ,AfterViewInit,AfterContentInit  {
  loginForm!:FormGroup
  constructor(private authService:AuthService, private formBuilder:FormBuilder,private router:Router){
    console.log("constructor");
  }
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit");
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ngOnChanges");
  }
  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      userName:[undefined,[Validators.required,Validators.nullValidator]],
      password:[undefined,[Validators.required,Validators.nullValidator]]
    })
  }

  login(){
    if(!this.loginForm.valid){
      Swal.fire({
        position: "top-end",
        title: 'Uups',
        text: 'Please check form!',
        icon:'error',
        showConfirmButton:false,
        timer:2500
      })
      return;
    }
    let loginDto:LoginDto=Object.assign({},this.loginForm.value)
    this.authService.login(loginDto).subscribe(result=>{
      if(result.status){
        Swal.fire({
          position: "top-end",
          title: 'Success',
          text: 'Login successful',
          showConfirmButton:false,
          timer:2500
        })
        this.router.navigateByUrl("/")
      }else{
        Swal.fire({
          position: "top-end",
          title: 'Error',
          text: result.message,
          icon:'error',
          showConfirmButton:false,
          timer:2500
        })
      }
    })
  }

}
