import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent implements OnInit {
   Courses$:Observable<Course[]>|null=null


  constructor(
    private CoursesService:CoursesService,
    public dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar
  ){
  this.Courses$=this.CoursesService.list().pipe(
    catchError(error=>{
      this.onError('Erro ao carregar cursos')
      return of([])
    })
  );


  }
  refresh(){
    this.Courses$=this.CoursesService.list().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of([])
      })
    );

  }
  onError(errorMSG:string){
    this.dialog.open(ErrorDialogComponent,{data:errorMSG})
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onAdd(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  onEdit(course:Course){
    this.router.navigate(['edit',course._id],{relativeTo:this.route});

  }
  onRemove(course:Course){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover o curso?',
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
     if(result){
      this.CoursesService.remove(course._id).subscribe(
        () =>{
          this.refresh();
          this.snackBar.open('Curso removido com sucesso!','X',{
            duration:5000,
            verticalPosition:'top',
            horizontalPosition:'center'
          });
        },
        error=>this.onError('Error ao remover curso.')
        );

     }
    });

  }
}
