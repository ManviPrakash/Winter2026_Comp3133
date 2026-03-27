import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RemoveSpacesPipe } from '../remove-spaces-pipe';
import { InputFormatDirective } from '../input-format';

interface Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, FormsModule, RemoveSpacesPipe, InputFormatDirective],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {
  heroes: Hero[] = [
    { id: 11, name: 'Dr-Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'Rubber-Man' },
    { id: 17, name: 'Dr-IQ' },
    { id: 18, name: 'Spider-Man' },
    { id: 19, name: 'Iron-Man' },
    { id: 20, name: 'Super-Woman' }
  ];

  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}