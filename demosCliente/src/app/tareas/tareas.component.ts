import { TareaService } from './../tarea.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css'],
})
export class TareasComponent implements OnInit {
  tareas: any[] = [];

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.tareaService.getAll().subscribe((tareas: any) => {
      console.log('Tareas ', tareas);
      this.tareas = tareas._embedded.tareas;
    })
  }
}
