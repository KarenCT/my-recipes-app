import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

// tslint:disable-next-line:eofline
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Aples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  /*CALL FROM ShoppingListComponent */
  // tslint:disable-next-line:typedef
  getIngredientes() {
    return this.ingredients.slice();
  }
  // tslint:disable-next-line:typedef
  getIngrediente(index: number) {
    return this.ingredients[index];
  }

  /*CALL FROM  ShoppingEditComponent */
  // tslint:disable-next-line:typedef
  addIngredient(ingredient: Ingredient) {
    /*Add ingredients to the real arry not to the copy*/
    this.ingredients.push(ingredient);
    /*Detect that the array has changed*/
    this.ingredientChanged.next(this.ingredients.slice());
  }
  /*CALL FROM RecipeService */
  // tslint:disable-next-line:typedef
  addIngredients(ingredientes: Ingredient[]) {
    /*Here we are using spred operator to make a single array an expose it into an element */
    /*Here we are avoiting to interate the arry in a for loop */
    this.ingredients.push(...ingredientes);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  // tslint:disable-next-line:typedef
  updeIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  // tslint:disable-next-line:typedef
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
