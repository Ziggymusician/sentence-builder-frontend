import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Models
import { Type } from 'src/app/models';

@Component({
  selector: 'app-sentence-form',
  templateUrl: './sentence-form.component.html',
  styleUrls: ['./sentence-form.component.scss'],
})
export class SentenceFormComponent {
  @Input()
  public form!: FormGroup;

  @Input()
  public types!: Type[];

  @Input()
  public words!: string[];

  @Output()
  public save: EventEmitter<void> = new EventEmitter<void>();

  public isSaving: boolean = false;

  public get typeField(): FormControl {
    return this.form.get('type') as FormControl;
  }

  public get wordField(): FormControl {
    return this.form.get('word') as FormControl;
  }

  public get sentenceField(): FormControl {
    return this.form.get('sentence') as FormControl;
  }

  public isControlInvalid(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  public isControlRequired(control: FormControl): boolean {
    return control.errors?.['required'];
  }

  public isFormHasError(key: string): boolean {
    return this.form.errors?.[key];
  }

  public onSave(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;
    this.save.emit();
  }
}
