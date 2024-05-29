import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user/user.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';
import { HeroImageComponent } from './core/components/hero-image/hero-image.component';
import { DataContainerComponent } from './core/components/data-container/data-container.component';
import { FooterComponent } from './core/components/footer/footer.component';

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
