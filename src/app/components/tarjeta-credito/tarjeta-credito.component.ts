import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCreditoService } from 'src/app/services/tarjeta-credito.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listaTarjetas: any[] = [];
  accion = 'Agregar';
  id: number | undefined;
  form: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService: TarjetaCreditoService) {
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
    this.obtenerTarjetas();
  }

  obtenerTarjetas()
  {
    this._tarjetaService.getListTarjetas().subscribe(data => {
      console.log(data);
      this.listaTarjetas = data;
    }, error => {
      console.log(error);
    });
  }

  guardarTarjeta() {
    const tarjeta: any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }

    if(this.id == undefined)
    {
      this._tarjetaService.postTarjeta(tarjeta).subscribe(data => {
        this.toastr.success('La tarjeta fue registrada exitosamente', 'Tarjeta Registrada!');
        this.obtenerTarjetas();
        this.form.reset();
      }, error => {
        this.toastr.error('Ops! Ha ocurrido un error al guardar la tarjeta', 'Error');
        console.log(error);
      });
    }
    else
    {
      tarjeta.id = this.id;
      this._tarjetaService.updateTarjeta(this.id, tarjeta).subscribe(data =>{
        this.form.reset();
        this.accion = 'Agregar';
        this.id = undefined;
        this.toastr.info('La tarjeta fue actualizada exitosamente', 'Tarjeta Actualizada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      });
    }
  }

  eliminarTarjeta(id: number)
  {
    this._tarjetaService.deleteTarjeta(id).subscribe(data => {
      this.toastr.error('La tarjeta fue eliminada exitosamente', 'Tarjeta Eliminada!');
      this.obtenerTarjetas();
    }, error => {
      console.log(error);
    });
  }

  editarTarjeta(tarjeta: any)
  {
    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
      });
  }
}
