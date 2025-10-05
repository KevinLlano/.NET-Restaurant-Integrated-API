import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer, CreateCustomer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error: string | null = null;
  
  // Form data for creating new customer
  newCustomer: CreateCustomer = {
    customer_name: ''
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = null;
    
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        console.log('Customers API response:', customers);
        this.customers = customers;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load customers. Please check if the API is running.';
        this.loading = false;
        console.error('Error loading customers:', err);
      }
    });
  }

  createCustomer(): void {
    if (!this.newCustomer.customer_name.trim()) {
      this.error = 'Please provide a valid customer name.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.customerService.createCustomer(this.newCustomer).subscribe({
      next: (createdCustomer) => {
        console.log('Created customer:', createdCustomer);
        // Supabase returns an array with the created customer
        const customer = Array.isArray(createdCustomer) ? createdCustomer[0] : createdCustomer;
        if (customer) {
          this.customers.push(customer);
        }
        this.newCustomer = { customer_name: '' };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to create customer.';
        this.loading = false;
        console.error('Error creating customer:', err);
      }
    });
  }

  deleteCustomer(id: number): void {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(customer => customer.customer_id !== id);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to delete customer.';
        this.loading = false;
        console.error('Error deleting customer:', err);
      }
    });
  }
}