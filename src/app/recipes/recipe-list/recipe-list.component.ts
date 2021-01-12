import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  /*Here we will have empty aproperty to save the data that comes from our RecipeService  */
  recipes: Recipe[];

  /*Inyectio of our RecipeService on this componet constructor to used it */
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  // tslint:disable-next-line:typedef
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnInit(): void {
    // tslint:disable-next-line:jsdoc-format
    /**GET A NEW ARRAY IF SOMETHING HAS CHANGED*/
    this.subscription = this.recipeService.resipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    /*Initialaze the recipies array with the recipes array that is in my Recipe service*/
    this.recipes = this.recipeService.getRecipes();
  }
  // tslint:disable-next-line:typedef
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
