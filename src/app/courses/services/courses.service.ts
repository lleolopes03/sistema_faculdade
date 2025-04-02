import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { first, pipe, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly Api='api/courses';

  constructor(private httpClient:HttpClient) { }
  list(){
    return this.httpClient.get<Course[]>(this.Api).pipe(first(),pipe(tap(Course=>console.log(Course))));
  }
  loadById(id:string){
    return this.httpClient.get<Course>(`${this.Api}/${id}`)
  }
  save(record:Partial<Course>){
    if(record._id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record:Partial<Course>){
    return this.httpClient.post<Course>(this.Api,record).pipe(first());
  }
  private update(record:Partial<Course>){
    return this.httpClient.put<Course>(`${this.Api}/${record._id}`,record).pipe(first());

  }
  remove(id:string){
    return this.httpClient.delete(`${this.Api}/${id}`).pipe(first());
  }


}
