import { TareaService } from './../tarea.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
})
export class TareasComponent implements OnInit {
  tareas: any[] = [];
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    completado: [false],
  });
  tareaEdicion: any;

  constructor(private tareaService: TareaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.tareaService.getAll().subscribe((tareas: any) => {
      console.log('Tareas ', tareas);
      this.tareas = tareas._embedded.tareas;
    });
  }

  save() {
    const values = this.miFormulario.value;

    console.log('values: ', values);

    let request;

    if (this.tareaEdicion) {
      request = this.tareaService.update(
        this.tareaEdicion._links.self.href,
        values
      );
    } else {
      request = this.tareaService.create(values);
    }

    request.subscribe({
      next: () => {
        this.getAll();
        this.tareaEdicion = null;
        this.miFormulario.setValue({
          nombre: '',
          completado: false,
        });
      },
      error: () => {},
    });
  }


  delete(tarea: any) {
    const respuesta = confirm('Desea Eliminar esta Tarea ?');
    if (respuesta) {
      console.log('Ruta ', tarea._links.self.href);
      this.tareaService.delete(tarea._links.self.href).subscribe(() => {
        this.getAll();
      });
    }
  }

  edit(tarea: any) {
    this.tareaEdicion = tarea;

    this.miFormulario.setValue({
      nombre: tarea.nombre,
      completado: tarea.completado,
    });
  }


}
