import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http:HttpClient) { }  

  public getIp()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  }  
}
