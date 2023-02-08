import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sentence-card',
  templateUrl: './sentence-card.component.html',
  styleUrls: ['./sentence-card.component.scss'],
})
export class SentenceCardComponent {
  @Input()
  public sentence!: string;
}
