import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  public static sentenceContainsWord(
    control: AbstractControl
  ): ValidationErrors | null {
    const { sentence, word } = control.getRawValue();
    const regex = new RegExp(`\\W*(${word})\\W`, 'gi');
    const hasWord = sentence.match(regex);

    return hasWord ? null : { wordNotUsed: true };
  }
}
