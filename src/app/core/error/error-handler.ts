import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, Injector } from '@angular/core'
import swal from 'sweetalert2';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private injector: Injector) {
        super()
    }

    override handleError(errorResponse: HttpErrorResponse | any) {
        if (errorResponse instanceof HttpErrorResponse && errorResponse.error != null) {
            swal.fire('Atenção!', '<br>' + errorResponse.error.errors.join('<br>'), 'warning');
        } else {
            swal.fire(
                'Estamos com problema na página!',
                '<br> Ocorreu um erro no sistema! Favor entrar em contato com o suporte - suporteportal@brq.com.br.',
                'error'
            )
        }
    }
}