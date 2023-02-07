import { FormName } from './enum/form-name.enum';

export interface FormError {
  form: FormName;
  error: string;
}
