import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
    selector: 'app-hero-image',
    standalone: true,
    templateUrl: './hero-image.component.html',
    styleUrl: './hero-image.component.css',
    imports: [
        RouterLink,
        CommonModule,
        ButtonComponent
    ]
})
export class HeroImageComponent {

}
