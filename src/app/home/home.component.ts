import { Component, OnInit, EventEmitter } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { MaterializeAction } from 'angular2-materialize';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  todos = new Array();

  constructor(private http: AjaxService) { 
    this.getTodos();    
  }

  modalActions = new EventEmitter<string | MaterializeAction>();
  openModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }

  ngOnInit() {
    
  }

  addTodos() {
    this.openModal();
  }

  getTodos(){
    this.http.getMethod('/getTodos').subscribe(
      data => this.gotTodos(data),
      err => this.error(err)
    )
  }
  gotTodos(data){
    if(data.status == 200) {
      this.todos = data.data;
    }
  }

  addTodo(name, details){
    var json = '{\
      "todo_name": "'+ name + '",\
      "details": "'+ details + '"\
      \}';
      this.http.postMethod('/addTodo', json).subscribe(
        (data) => this.addedTodo(data),
        (err) => this.error(err)
      )
  }

  addedTodo(data) {
    if(data.status == 200 ) {
      this.closeModal();
      this.getTodos();      
      this.modalActions.emit({ action: "toast", params: [data.message, 3000]});  
    }
  }

  markTodoAsImportant(id, i) {
    const imp = true;
    var json = {
      todo_id: id,
      important: imp
    }
    this.http.postMethod('/updateTodoImp', json).subscribe(
      (data) => this.markedTodoAsImportant(data, i),
      (err) => this.error(err)
    )
  }

  markedTodoAsImportant(data, i) {
    if(data.status == 200) {
      this.getTodos();
      this.modalActions.emit({ action: "toast", params: [data.message, 3000]});        
    }
  }

  completeTodo(id, i) {
    var complete = 'completed';
    var json = {
      todo_id: id,
      statusofTodo: complete
    }
    console.log(json);
    this.http.postMethod('/updateTodoStatus', json).subscribe(
      (data) => this.completedTodo(data, i),
      (err) => this.error(err)
    )
  }

  completedTodo(data, i) {
    if(data.status == 200) {
      this.getTodos();
      this.modalActions.emit({ action: "toast", params: [data.message, 3000]});              
    }
  }

  error(err){
    this.modalActions.emit({ action: "toast", params: [data.message, 3000]});                  
  }
}
