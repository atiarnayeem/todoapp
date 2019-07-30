import { todo } from './../models/todo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = "https://jsonplaceholder.typicode.com/todos";
  todosLimit = "?_limit=5";

  constructor(private http: HttpClient) { }

  // Get Todos
  getTodos():Observable<todo[]>
  {
    return this.http.get<todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Delete Todo
  deleteTodo(todo: todo):Observable<todo>
  {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<todo>(url, httpOptions)  
  }

  // Add Todo
  addTodo(todo:todo):Observable<todo> {
    return this.http.post<todo>(this.todosUrl, todo, httpOptions);
  }


  // Toggle Completed
  toggleCompleted(todo: todo): Observable<any>
  {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
