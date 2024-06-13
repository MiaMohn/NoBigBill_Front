import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-data-container',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterOutlet,
    ButtonComponent
  ],
  templateUrl: './data-container.component.html',
  styleUrl: './data-container.component.css'
})
export class DataContainerComponent {

}
