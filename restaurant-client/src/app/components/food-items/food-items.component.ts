import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FoodItem, CreateFoodItem } from '../../models/food-item.model';
import { FoodItemService } from '../../services/food-item.service';

@Component({
  selector: 'app-food-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './food-items.component.html',
  styleUrls: ['./food-items.component.scss']
})
export class FoodItemsComponent implements OnInit {
  foodItems: FoodItem[] = [];
  loading = false;
  error: string | null = null;
  
  // Form data for creating new food item
  newFoodItem: CreateFoodItem = {
    food_item_name: '',
    price: 0
  };

  constructor(private foodItemService: FoodItemService) {}

  ngOnInit(): void {
    this.loadFoodItems();
  }

  loadFoodItems(): void {
    this.loading = true;
    this.error = null;
    
    this.foodItemService.getFoodItems().subscribe({
      next: (foodItems) => {
        console.log('Food items API response:', foodItems);
        this.foodItems = foodItems;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load food items. Please check if the API is running.';
        this.loading = false;
        console.error('Error loading food items:', err);
      }
    });
  }

  createFoodItem(): void {
    if (!this.newFoodItem.food_item_name.trim() || this.newFoodItem.price <= 0) {
      this.error = 'Please provide valid food item name and price.';
      return;
    }

    this.loading = true;
    this.error = null;

    this.foodItemService.createFoodItem(this.newFoodItem).subscribe({
      next: (createdItem) => {
        console.log('Created food item:', createdItem);
        // Supabase returns an array with the created item
        const item = Array.isArray(createdItem) ? createdItem[0] : createdItem;
        if (item) {
          this.foodItems.push(item);
        }
        this.newFoodItem = { food_item_name: '', price: 0 };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to create food item.';
        this.loading = false;
        console.error('Error creating food item:', err);
      }
    });
  }

  deleteFoodItem(id: number): void {
    if (!confirm('Are you sure you want to delete this food item?')) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.foodItemService.deleteFoodItem(id).subscribe({
      next: () => {
        this.foodItems = this.foodItems.filter(item => item.food_item_id !== id);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to delete food item.';
        this.loading = false;
        console.error('Error deleting food item:', err);
      }
    });
  }
}