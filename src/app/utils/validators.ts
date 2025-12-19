import { AbstractControl, ValidationErrors } from '@angular/forms';


export function singleUrlValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value || '').trim();
  if (!value) return null;

  //para múltiples URLs
  if (/\s|,|;/.test(value)) return { multipleUrls: true };

  try {
    const test = value.startsWith('http://') || value.startsWith('https://') ? value : `http://${value}`;

    new URL(test);
  } catch {
    return { invalidUrl: true };
  }

  return null;
}
