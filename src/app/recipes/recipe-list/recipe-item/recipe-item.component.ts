import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
/*Get the recipe from out side*/
/*Make public for changes @Input() */
@Input() recipe: Recipe;
@Input() index: number; /* used on recipe list*/

  ngOnInit(): void {
  }

// tslint:disable-next-line:eofline
}