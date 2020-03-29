import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todoList: AngularFireList<any>;
  constructor(private firebase: AngularFireDatabase) { }


  gettodoList(){
    this.todoList=this.firebase.list('titles');
    return this.todoList;
  }

  addTitle(title:string){
    this.todoList.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUnckeckTitle($key: string, flag: boolean) {
    this.todoList.update($key,{isChecked:flag});
  }

  removeTitle($key: string){
    this.todoList.remove($key);
  }


  // getEdit($key: string){
    
  // }


}
