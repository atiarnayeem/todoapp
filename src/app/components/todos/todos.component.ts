import { TodoService } from './../../services/todo.service';
import { todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit() 
  {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:todo)
  {
    // Remove from UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove from server
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:todo) 
  {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
