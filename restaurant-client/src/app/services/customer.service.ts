import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer, CreateCustomer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly supabaseUrl = 'https://buerghajsnwleipuccny.supabase.co';
  private readonly supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1ZXJnaGFqc253bGVpcHVjY255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MDcxOTgsImV4cCI6MjA3NTE4MzE5OH0.j81sYaUo8hDpTjSnkaHirggpgmjUbJxJ7QcCzL3vo-A';
  private readonly headers = new HttpHeaders({
    'apikey': this.supabaseKey,
    'Authorization': `Bearer ${this.supabaseKey}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  // GET: customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(
      `${this.supabaseUrl}/rest/v1/customers?select=*`,
      { headers: this.headers }
    );
  }

  // GET: customers by id
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      `${this.supabaseUrl}/rest/v1/customers?id=eq.${id}&select=*`,
      { headers: this.headers }
    );
  }

  // POST: customers
  createCustomer(customer: CreateCustomer): Observable<Customer | Customer[]> {
    const headersWithPrefer = this.headers.set('Prefer', 'return=representation');
    return this.http.post<Customer | Customer[]>(
      `${this.supabaseUrl}/rest/v1/customers`,
      customer,
      { headers: headersWithPrefer }
    );
  }

  // PUT: customers
  updateCustomer(id: number, customer: CreateCustomer): Observable<Customer> {
    return this.http.put<Customer>(
      `${this.supabaseUrl}/rest/v1/customers?id=eq.${id}`,
      customer,
      { headers: this.headers }
    );
  }

  // DELETE: customers
  deleteCustomer(id: number): Observable<void> {
    const headersWithPrefer = this.headers.set('Prefer', 'return=minimal');
    return this.http.delete<void>(
      `${this.supabaseUrl}/rest/v1/customers?customer_id=eq.${id}`,
      { headers: headersWithPrefer }
    );
  }
}