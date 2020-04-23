import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Recipe} from "./Shared/recipe";
import {RecipesService} from "./Shared/recipes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
recipes$: Observable<Recipe[]>
  constructor(private recipesService: RecipesService, private router: Router) { }

  ngOnInit(): void {
  this.recipes$ = this.recipesService.getAllRecipes();
  }

}
