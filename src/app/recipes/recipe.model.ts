import { Ingredient } from '../shared/ingredient.model';
export class Recipe{
 public name: string;
 public description: string;
 public imagePath: string;
 /*Add the ingridients to a recipe to display it on the UI*/
 public ingredients: Ingredient[];


constructor(name: string, desc: string, imagePath: string, ingredients: Ingredient[]){
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;

}

// tslint:disable-next-line:eofline
}