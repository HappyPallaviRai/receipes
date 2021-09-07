import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { StorageRecipeService } from "../shared/storage-recipe.service";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  @Output() featureSelected = new EventEmitter<string>();
  constructor(
    private storageService: StorageRecipeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  SaveData() {
    this.storageService.SaveRecipe();
  }
  FetchRecipe() {
    this.storageService.FetchRecipe().subscribe();
  }
  onLogout() {
    this.authService.Logout();
  }
}
