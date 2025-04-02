import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../model/course';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',

})
export class CoursesListComponent implements OnInit{
  @Input() Courses:Course[]=[]
  @Output()add=new EventEmitter(false)
  @Output()edit=new EventEmitter(false)
  @Output()remove=new EventEmitter(false)
  displayedColumns=['name','category','actions'];
  constructor(

  ){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onAdd(){
    this.add.emit(true)

  }
  onEdit(course:Course){
    this.edit.emit(course);
  }
  onDelete(course:Course){
    this.remove.emit(course);
  }

}
