import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  /*Stop the subscribe when it is executed*/

  private igChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  /*Here we will call the server shoppingListService to add ingridientes */
  /*Load the existing ingredients in the UI */
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredientes();
    this.igChangeSub = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }
  /*Stop the subscribe when it is executed*/
  // tslint:disable-next-line:typedef
  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
  // tslint:disable-next-line:typedef
  onEditItem(index: number){

    this.shoppingListService.startedEditing.next(index);

  }
}
