import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem, CreateFoodItem } from '../models/food-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private readonly apiUrl = `${environment.apiUrl}/FoodItem`;

  constructor(private http: HttpClient) { }

  // GET: api/FoodItem
  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(this.apiUrl);
  }

  // GET: api/FoodItem/5
  getFoodItem(id: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(`${this.apiUrl}/${id}`);
  }

  // POST: api/FoodItem
  createFoodItem(foodItem: CreateFoodItem): Observable<FoodItem> {
    return this.http.post<FoodItem>(this.apiUrl, foodItem);
  }

  // PUT: api/FoodItem/5
  updateFoodItem(id: number, foodItem: FoodItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, foodItem);
  }

  // DELETE: api/FoodItem/5
  deleteFoodItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}