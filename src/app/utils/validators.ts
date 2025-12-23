import { AbstractControl, ValidationErrors } from '@angular/forms';
//validador

export function singleUrlValidator(control: AbstractControl): ValidationErrors | null {
  const raw = control.value;
  if (raw === null || raw === undefined) return null;

  const value = String(raw).trim();

  // Rechazar entradas que sean solo espacios o cadena vacía
  if (value.length === 0) return { invalidUrl: true };

  // Detectar cualquier espacio en blanco (espacio, tab, etc)
  if (/\s/.test(value)) return { multipleUrls: true };
  
  // Detectar comas o puntos y coma
  if (/[,;]/.test(value)) return { multipleUrls: true };

  // Detectar múltiples protocolos (ej: http://... http://...)
  // Esto cubre casos donde podrían estar pegados o con caracteres raros
  const protocolCount = (value.match(/https?:\/\//gi) || []).length;
  if (protocolCount > 1) return { multipleUrls: true };

  try {
    const test = value.startsWith('http://') || value.startsWith('https://') ? value : `http://${value}`;
    new URL(test);
  } catch {
    return { invalidUrl: true };
  }

  return null;
}

export function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
}
