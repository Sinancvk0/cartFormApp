import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn:'root'
})
export class ProductService{
    constructor(private httpClient:HttpClient){}

    getAll():Observable<Product[]>{
        return this.httpClient.get<Product[]>("/assets/productList.json")
    }
    

}