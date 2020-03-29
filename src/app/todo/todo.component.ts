import { Component, OnInit, Output, ElementRef, ViewChild, Input, ContentChild  } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  toDoListArray: any[];
  

  constructor(private toDoService: TodoService) { 
    
  }

  ngOnInit() {
    this.toDoService.gettodoList().snapshotChanges()
      .subscribe(item => {
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        })

        //sort array isChecked false  -> true
        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      });
  }

  Add(itemTitle) {
    this.toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  alterCheck($key: string, isChecked) {
    this.toDoService.checkOrUnckeckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.toDoService.removeTitle($key);
  }

  // @ViewChild('itemTitle',{title: ElementRef})
  


  onEdit(row){
    console.log(this.toDoListArray);
    //  this.inputTitle.nativeElement.value = this.toDoListArray[row].itemTitle;
    
  }
  

}
