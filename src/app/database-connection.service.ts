import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { EventInput } from '@fullcalendar/core';
import { Observable, catchError, of } from 'rxjs';
import { TaskPost } from './task-post';
import { TaskList } from './task-list';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService{
  private readonly link: string = "http://localhost:9090"

  constructor(private http: HttpClient) { }

  fetchAll(): Observable<TaskList> {
    return this.http.get<TaskList>(this.link + "/api/v1/read/all", {});
  }

  fetchInRange(first: Date, last: Date): Observable<TaskList> {
    return this.http.request<TaskList>("get", this.link + "/api/v1/read/all/range", {body: {start: first, end: last}})
  }
  
  fetchInDay(first: Date): Observable<EventInput> {
    return this.http.request<Task>("get", this.link + "/api/v1/read/all/day", {body: {date: first}})
  }

  postCreate(date: Date, title: string, description: string): Observable<TaskPost> {
    return this.http.request<TaskPost>("post", this.link + "/api/v1/create", {body: {dateTime: date, Title: title, Description: description}})
  }

  deleteTask(id: number): Observable<TaskPost> {
    return this.http.request<TaskPost>("delete", this.link + "/api/v1/delete", {body: {id: id}})
  }

  postUpdate(id: number, date: Date, description: string, title: string): Observable<TaskPost> {
    return this.http.request<TaskPost>("post", this.link + "/api/v1/update", {body: {id: id, dateTime: date, Title: title, Description: description }})
  }
}
