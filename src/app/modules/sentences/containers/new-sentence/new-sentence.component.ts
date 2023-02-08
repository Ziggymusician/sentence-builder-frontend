import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// Models
import { Type } from 'src/app/models';

// Services
import { SentenceBuilderService, UnsubscriberService } from 'src/app/services';

// Validators
import { CustomValidators } from 'src/app/validators';

@Component({
  selector: 'app-new-sentence',
  templateUrl: './new-sentence.component.html',
  styleUrls: ['./new-sentence.component.scss'],
  providers: [UnsubscriberService],
})
export class NewSentenceComponent implements OnInit {
  public form!: FormGroup;
  public types$!: Observable<Type[]>;
  public words$!: Observable<string[]>;

  constructor(
    private router: Router,
    private unsubscriber: UnsubscriberService,
    private sentenceBuilder: SentenceBuilderService
  ) {}

  public ngOnInit(): void {
    this.types$ = this.sentenceBuilder.getTypes();

    this.initForm();
    this.handleFormChangeEvents();
  }

  public onSaveSentence(): void {
    const { sentence } = this.form.value;
    this.sentenceBuilder.saveSentence(sentence).subscribe(() => {
      this.router.navigate(['/sentences']);
    });
  }

  private handleFormChangeEvents(): void {
    this.handleTypeOnChangeEvent();
    this.handleWordOnChangeEvent();
  }

  private handleTypeOnChangeEvent(): void {
    const typeFC = this.form.get('type') as FormControl;
    const wordFC = this.form.get('word') as FormControl;

    typeFC.valueChanges
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((value) => {
        this.resetFormControl(wordFC);

        if (value) {
          this.words$ = this.sentenceBuilder.getTypeWords(value);
          wordFC.enable();
        } else {
          wordFC.disable();
        }
      });
  }

  private handleWordOnChangeEvent(): void {
    const wordFC = this.form.get('word') as FormControl;
    const sentenceFC = this.form.get('sentence') as FormControl;

    wordFC.valueChanges
      .pipe(this.unsubscriber.takeUntilDestroy)
      .subscribe((word) => {
        this.resetFormControl(sentenceFC);

        if (word) {
          sentenceFC.enable();
        } else {
          sentenceFC.disable();
        }
      });
  }

  private resetFormControl(control: FormControl): void {
    control.setValue('');
    control.markAsPristine();
    control.markAsUntouched();
  }

  private initForm(): void {
    this.form = new FormGroup(
      {
        type: new FormControl('', [Validators.required]),
        word: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        sentence: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
      },
      { validators: CustomValidators.sentenceContainsWord }
    );
  }
}
