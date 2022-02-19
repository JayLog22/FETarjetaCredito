import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listaTarjetas: any[] =
    [
      { titular: "Juan Perez", numeroTarjeta: "12345678910111213", fechaExpiracion: "09/10", cvv: "123" },
      { titular: "Miguel Lopez", numeroTarjeta: "0908012345678980", fechaExpiracion: "10/11", cvv: "123" }
    ];

  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.form = this.fb.group(
      {
        titular: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16), Validators.pattern('[0-9]*')  ]],
        fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5), Validators.pattern('(0[1-9]|1[0-2])\/?([0-9]{2})')]],
        cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3), Validators.pattern('[0-9]*')]]
      }
    );
  }

  ngOnInit(): void {
  }

  agregarTarjeta() {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    this.listaTarjetas.push(tarjeta);
    this.toastr.success('La tarjeta fue registrada exitosamente', 'Tarjeta Registrada!');
    this.form.reset();
  }

  eliminarTarjeta(index: number)
  {
    this.listaTarjetas.splice(index, 1);
    this.toastr.error('La tarjeta fue eliminada exitosamente', 'Tarjeta Eliminada!')
  }
}
