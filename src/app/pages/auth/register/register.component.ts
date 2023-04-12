import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormBaseComponent } from 'src/app/shared/components/form-base/form-base.component';

import { CustomValidators } from '@narik/custom-validators';
import { RegisterUserModel } from 'src/app/core/models/auth/RegisterUser.model';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'rpw-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends FormBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  user: RegisterUserModel;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,) {
    super()

    this.validationMessages = {
      firstName: {
        required: 'Campo obrigatório.'
      },
      lastName: {
        required: 'Campo obrigatório.'
      },
      email: {
        required: 'Campo obrigatório.',
        email: 'E-mail inválido.'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senhas não conferem'
      },
      phoneNumber: {
        required: 'Campo obrigatório.',
        arrayLength: 'O Telefone não pode ter mais que 11 números'
      },
      registry: {
        required: 'Campo obrigatório.'
      },
    };

    this.configurarMensagensValidacaoBase(this.validationMessages);
  }

  ngAfterViewInit(): void {
    this.configurarValidacaoFormularioBase(this.formInputElements, this.registerForm);
  }


  ngOnInit(): void {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(senha)]);

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: senha,
      confirmPassword: senhaConfirm,
      phoneNumber: ['', [Validators.required]],
      registry: ['', Validators.required]
    })
  }

  signup() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      this.user = Object.assign({}, this.user, this.registerForm.value);

      this.authService.registerUser(this.user)
        .subscribe(
          success => {
            console.log('success -> ', success)
            this.snackBar.open('Cadastro Realizado com sucesso, confirme o e-mail!', 'ok', {
              duration: 2000,
            });
          }
        )
    }
  }

}