import { Directive } from '@angular/core';
import {AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {UserService} from '../user.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Result} from '../../common/result';

@Directive({
  selector: '[appImageCodeValidator]',
  providers: [
    {provide: NG_ASYNC_VALIDATORS, useExisting: ImageCodeValidatorDirective, multi: true}
  ]
})
export class ImageCodeValidatorDirective {

  constructor(private us: UserService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return this.us.verifyImageCode(control.value).pipe(
      map((result: Result<string>) => {
        return result.success ? null : {verifyImageCode: true};
      }),
      catchError(e => of({verifyImageCode: true}))
    );
  }
}
