import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './users/services/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeroImageComponent } from './shared/components/hero-image/hero-image.component';
import { DataContainerComponent } from './shared/components/data-container/data-container.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    HeaderComponent,
    HeroImageComponent,
    DataContainerComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'No Big Bill';
  private userService = inject(UserService);
  users$ = this.userService.getUsers();
}
