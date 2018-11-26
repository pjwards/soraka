import {
  Component,
  Vue,
} from 'vue-property-decorator';
import {
  EMAIL_RULES,
  PASSWORD_RULES,
  Rule,
} from '@/interfaces/auth';
import { signUpLocal } from '@/api/user';
import { SignUpForm } from '@/types/domain/inteface/auth';
import { ErrorResponse } from '@/types/domain/inteface/api';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component
export default class SignUpComponent extends Vue {

  public valid: boolean = true;
  public email: string = '';
  public password: string = '';

  public emailRules: Rule[] = EMAIL_RULES;
  public passwordRules: Rule[] = PASSWORD_RULES;

  public errors: ErrorResponse[] = [];

  public signUp(): void {
    if (!(this.$refs.form as any).validate()) {
      return;
    }
    signUpLocal({
      email: this.email,
      password: this.password,
    })
      .pipe(
        catchError((err: any) => {
          if (err && err.errors) {
            this.errors = err.errors;
          }

          this.errors = [{
            location: '',
            param: '',
            msg: 'Server error occurred.',
          }];

          return EMPTY;
        }),
      )
      .subscribe(() => {
        this.$router.push('login');
      });
  }
}
