export interface FoodItem {
  food_item_id: number;
  food_item_name: string;
  price: number;
}

export interface CreateFoodItem {
  food_item_name: string;
  price: number;
}