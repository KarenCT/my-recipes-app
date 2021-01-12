import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthSevice } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthSevice
  ) {}

  // tslint:disable-next-line:typedef
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://recipe-backend-2f40a-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  // tslint:disable-next-line:typedef
  fetchRecipes() {
    /*Get token to fech data from back end*/
    return this.http
      .get<Recipe[]>(
        'https://recipe-backend-2f40a-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  } /**/
}
