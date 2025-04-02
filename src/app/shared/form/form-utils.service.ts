import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }
  getErrorMessage(FormGroup:UntypedFormGroup,fieldName:string){
    const field = FormGroup.get(fieldName) as UntypedFormControl;
      return this.getErrorMessageFromField(field);
    }
    validateAllFormFields(FormGroup:UntypedFormGroup | UntypedFormArray){
      Object.keys(FormGroup.controls).forEach(field =>{
        const control = FormGroup.get(field);
        if(control instanceof UntypedFormControl){
          control.markAsTouched({onlySelf:true})
        } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray){
          control.markAsTouched({onlySelf:true})
          this.validateAllFormFields(control);
        }
      })
    }
    getErrorMessageFromField(field:UntypedFormControl){
      if(field?.hasError('required')){
        return 'Campo obrigatório';
      }
      if(field?.hasError('minlength')){
        const requiredLength:number=field.errors?field.errors['minlength']['requiredLength']:5;
        return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
      }
      if(field?.hasError('maxlength')){
        const requiredLength:number = field.errors ? field.errors['maxlength']['requiredLength']:200;
        return `Tamanho máximo excedido ${requiredLength} caracteres.`;
    }
    return 'Campo invalido'
  }
  getFormArrayFieldMessage(FormGroup:UntypedFormGroup,formArrayName:string, fieldName:string,index:number){
    const formArray = FormGroup.get(formArrayName)as UntypedFormArray;
    const field = formArray.controls[index].get (fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }
  isFormArrayRequired(FormGroup:UntypedFormGroup,formArrayName:string){
    const formArray = FormGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required')&& formArray.touched;

  }
}
