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
    nombre: ['', Validators.required ],
    completado: [false],
  });

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

    this.tareaService.create(values).subscribe({
      next: () => {
        this.getAll();
        this.miFormulario.setValue({
          nombre:'',
          completado:false
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
}
