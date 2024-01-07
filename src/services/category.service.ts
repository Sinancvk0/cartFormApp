import { HttpClient } from "@angular/common/http";
import { Category } from "../models/category";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class CategoryService{
    constructor(private httpClient:HttpClient){}

    getAll():Observable<Category[]>{
        return this.httpClient.get<Category[]>("/assets/categoryList.json")
    }
}