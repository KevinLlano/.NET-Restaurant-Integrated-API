import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem, CreateFoodItem } from '../models/food-item.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {
  private readonly supabaseUrl = 'https://buerghajsnwleipuccny.supabase.co';
  private readonly supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1ZXJnaGFqc253bGVpcHVjY255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDcxOTgsImV4cCI6MjA3NTE4MzE5OH0.j81sYaUo8hDpTjSnkaHirggpgmjUbJxJ7QcCzL3vo-A';
  private readonly headers = new HttpHeaders({
    'apikey': this.supabaseKey,
    'Authorization': `Bearer ${this.supabaseKey}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // GET: food_items
  getFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(
      `${this.supabaseUrl}/rest/v1/food_items?select=*`,
      { headers: this.headers }
    );
  }

  // GET: food_items by id
  getFoodItem(id: number): Observable<FoodItem> {
    return this.http.get<FoodItem>(
      `${this.supabaseUrl}/rest/v1/food_items?id=eq.${id}&select=*`,
      { headers: this.headers }
    );
  }

  // POST: food_items
  createFoodItem(foodItem: CreateFoodItem): Observable<FoodItem | FoodItem[]> {
    const headersWithPrefer = this.headers.set('Prefer', 'return=representation');
    return this.http.post<FoodItem | FoodItem[]>(
      `${this.supabaseUrl}/rest/v1/food_items`,
      foodItem,
      { headers: headersWithPrefer }
    );
  }

  // PUT: food_items
  updateFoodItem(id: number, foodItem: CreateFoodItem): Observable<FoodItem> {
    return this.http.put<FoodItem>(
      `${this.supabaseUrl}/rest/v1/food_items?id=eq.${id}`,
      foodItem,
      { headers: this.headers }
    );
  }

  // DELETE: food_items
  deleteFoodItem(id: number): Observable<void> {
    const headersWithPrefer = this.headers.set('Prefer', 'return=minimal');
    return this.http.delete<void>(
      `${this.supabaseUrl}/rest/v1/food_items?food_item_id=eq.${id}`,
      { headers: headersWithPrefer }
    );
  }
}
