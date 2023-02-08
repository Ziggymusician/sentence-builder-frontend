import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

// Services
import { SentenceBuilderService, UnsubscriberService } from 'src/app/services';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.scss'],
  providers: [UnsubscriberService],
})
export class SentencesComponent implements OnInit {
  public sentences$!: Observable<string[]>;
  public isLoading: boolean = true;

  constructor(
    private sentenceBuilder: SentenceBuilderService,
    private unsubscriber: UnsubscriberService
  ) {}

  public ngOnInit(): void {
    this.loadSentences();
  }

  private loadSentences(): void {
    this.sentenceBuilder
      .getSentences()
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((sentences) => {
        if (sentences) {
          this.isLoading = false;
          this.sentences$ = of(sentences);
        }
      });
  }
}
