import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TareaService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('http://localhost:8080/api/tareas');
  }

  create(tarea: any) {
    return this.http.post('http://localhost:8080/api/tareas', tarea);
  }

  update(href: string, tarea: any) {
    return this.http.put(href, tarea);
  }

  delete(href:string) {
    return this.http.delete(href);
  }
}
