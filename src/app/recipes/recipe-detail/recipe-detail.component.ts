import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, Routes } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    /*How to pass the selecated recipe id*/
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }
  // tslint:disable-next-line:typedef
  onAddToShoppingList() {
    this.recipeService.addIngedientsToShoppingList(this.recipe.ingredients);
  }
  // tslint:disable-next-line:typedef
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  // tslint:disable-next-line:typedef
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
