import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

/**
 * PasswordsMatchValidator - A custom validator for matching passwords in a FormGroup.
 * @param passwordControlName - The name of the password control in the FormGroup.
 * @param confirmPasswordControlName - The name of the confirm password control in the FormGroup.
 * @returns A ValidatorFn that validates if the password and confirm password fields match.
 */
export function PasswordsMatchValidator(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    // Ensure that the control is a FormGroup
    if (!(formGroup instanceof FormGroup)) {
      return null;
    }

    const passwordControl = formGroup.get(passwordControlName);
    const confirmPasswordControl = formGroup.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ notMatch: true });
      return { notMatch: true }; // Return validation error
    } else {
      // Clear errors if the password matches
      if (confirmPasswordControl.errors) {
        delete confirmPasswordControl.errors['notMatch'];
        if (Object.keys(confirmPasswordControl.errors).length === 0) {
          confirmPasswordControl.setErrors(null);
        } else {
          confirmPasswordControl.setErrors(confirmPasswordControl.errors);
        }
      }
    }

    return null; // Return null if validation passes
  };
}
