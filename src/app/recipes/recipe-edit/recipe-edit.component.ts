import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  id = -1;
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}
  // tslint:disable-next-line:typedef
  onSubmit() {
    /*const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.description,
      this.recipeForm.value.Ingredients
    );*/
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      this.editMode = false;
    }
    this.onCancelRecipe();
  }

  // tslint:disable-next-line:typedef
  onAddIngredient() {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  // tslint:disable-next-line:typedef
  onCancelRecipe() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // tslint:disable-next-line:typedef
  onDeleteIngredient(index: number) {
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      console.log(this.id);
      this.editMode = +params.id > -1;
      console.log(this.editMode);
      this.initForm();
    });
  }
  /*Here we are using the reactive form where the controls are created from ts file */
  // tslint:disable-next-line:typedef
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    // tslint:disable-next-line:prefer-const
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      // tslint:disable-next-line:no-string-literal
      if (recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
