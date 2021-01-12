import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /*Get the full from objet to set it in edit mode*/
  @ViewChild('f') shoplistForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  /*Inyection of the service */
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        /*Get the ingredient that we wnat to edit from de server */
        this.editedItem = this.shoppingListService.getIngrediente(index);
        /*Get the ingredient values to edit them */
        this.shoplistForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }
  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    /*HERE WE GET THE VALUES FROM HTML WITH NGForm*/
    const value = form.value;
    const newIngridient = new Ingredient(value.name, value.amount);

    /*Validete if we are editing or adding a new Ingredient */
    if (this.editMode) {
      /*Edditing a existing item to the ingredients array*/
      this.shoppingListService.updeIngredient(
        this.editedItemIndex,
        newIngridient
      );
    } else {
      /*Adding a new item to the ingredients array*/
      this.shoppingListService.addIngredient(newIngridient);
    }
    /*Disable the editmode*/
    this.editMode = false;
    /*Reset the form after add or edit an item*/
    form.reset();
  }
  // tslint:disable-next-line:typedef
  onClear() {
    /*Access the form object*/
    this.shoplistForm.reset();
    this.editMode = false;
  }
  // tslint:disable-next-line:typedef
  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
