import {Directive} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {UserService} from '../user.service';
import {catchError, map} from 'rxjs/operators';
import {Result} from '../../common/result';

@Directive({
  selector: '[appPhoneValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true
    }
  ]
})
export class PhoneValidatorDirective {

  constructor(private us: UserService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.us.verifyPhone(control.value).pipe(
      map((result: Result<string>) => {
        return result.success ? null : {verifyPhone: true};
      }),
      catchError(e => of({verifyPhone: true}))
    );
  }

}
