import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { Inventory } from "../../Models/Inventory.model";
import { ApiResponse } from "../../Models/ApiResponse.model";
import axios from "axios";

@Injectable({ providedIn: 'root' })
export class InventoryService {
  apiUrl = 'http://localhost:5181/api/inventory';

  constructor(private http: HttpClient) {}
  
  getInventories():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.apiUrl)
  }

  postInventory(postData:Inventory){
    return this.http.post<ApiResponse>(`${this.apiUrl}`,postData)
  }

  updateInventory(updateData:Inventory){
    return this.http.put<ApiResponse>(`${this.apiUrl}`, updateData)
  }
  
  deleteInventory(inventoryId:number){
    return this.http.delete<ApiResponse>(`${this.apiUrl}/${inventoryId}`)
  }

  async fileUpload(file){
    let formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`${this.apiUrl}/upload`, formData, {
      headers:{
        'Content-Type':"multipart/form-data"
      }
    })
  return res.data.data;    
  }

}
