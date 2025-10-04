export interface FoodItem {
  foodItemId: number;
  foodItemName: string;
  price: number;
}

export interface CreateFoodItem {
  foodItemName: string;
  price: number;
}