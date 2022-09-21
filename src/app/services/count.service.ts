import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  public count = 0;  
  
  setCount(count) {  
     
    this.count = count;  
  }  
  
  getCount() {  
    return this.count;  
  }  
}  

