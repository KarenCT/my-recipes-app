import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

/*Inject a service*/
@Injectable()

/*This server will return the recipe data that will be displayed on the UI*/
export class RecipeService {
  /*listener for the changes*/
  resipesChanged = new Subject<Recipe[]>();
  /*The array is private to not access it outside*/
  // tslint:disable-next-line:new-parens
  /*private recipes: Recipe[] = [
    new Recipe(
      'Ramen',
      'This a tasty recipe from Corea',
      'https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?resize=640%2C360&ssl=1',
      [
        new Ingredient('Noodles', 1),
        new Ingredient('Chiken', 1),
        new Ingredient('Tomato', 1),
      ]
    ),
    new Recipe(
      'Chiken with esaparagus',
      'This a tasty recipe from China',
      'https://www.eatwell101.com/wp-content/uploads/2019/04/chicken-and-asparagus-skillet-recipe-2.jpg',
      [
        new Ingredient('Chiken', 1),
        new Ingredient('sparragus', 3),
        new Ingredient('Lemon', 1),
      ]
    ),
  ];*/
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}
  /*Add a get method to return it outside */
  // tslint:disable-next-line:typedef
  getRecipes() {
    /* With slice() we can retun a copy of the original one to avoid edit it. Since it is a referce type */
    return this.recipes.slice();
  }
  // tslint:disable-next-line:typedef
  getRecipe(id: number) {
    return this.recipes[id];
  }

  // tslint:disable-next-line:typedef
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    /*Here we inform that there is a new change in the data*/
    return this.resipesChanged.next(this.recipes.slice());
  }
  // tslint:disable-next-line:typedef
  addIngedientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
  // tslint:disable-next-line:typedef
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    /*Informing that a new recipe was aded*/
    this.resipesChanged.next(this.recipes.slice());
  }
  // tslint:disable-next-line:typedef
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    /*Informing that a  recipe was updated*/
    this.resipesChanged.next(this.recipes.slice());
  }
  // tslint:disable-next-line:typedef
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.resipesChanged.next(this.recipes.slice());
  }
}
