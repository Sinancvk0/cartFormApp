import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({providedIn:'root'})
export class UserService{
    constructor(private httpClient:HttpClient){}
    getAll():Observable<User[]>{
        return this.httpClient.get<User[]>("/assets/userList.json")
    }
}