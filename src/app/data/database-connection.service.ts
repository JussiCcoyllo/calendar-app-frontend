import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TaskPost } from '../main-page/task/task-post'; 
import { TaskList } from '../main-page/task/task-list';
import { Task } from '../main-page/task/task'
import { User } from '../main-page/user/user';
import { UserDelete } from '../main-page/user/user-delete';
import { UserGet } from '../main-page/user/user-get';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService{
  private readonly link: string = "http://localhost:9090"

  constructor(private http: HttpClient) { }

  fetchAllTasks(): Observable<TaskList> {
    return this.http.get<TaskList>(this.link + "/api/v1/read/all", {});
  }

  fetchInRangeTask(first: Date, last: Date): Observable<TaskList> {
    return this.http.request<TaskList>("get", this.link + "/api/v1/read/all/range", {body: {start: first, end: last}})
  }

  fetchInDayTask(first: Date): Observable<Task> {
    return this.http.request<Task>("get", this.link + "/api/v1/read/all/day", {body: {date: first}})
  }

  postCreateTask(date: Date, title: string, description: string): Observable<TaskPost> {
    return this.http.request<TaskPost>("post", this.link + "/api/v1/create", {body: {dateTime: date, Title: title, Description: description}})
  }

  deleteTaskTask(id: number): Observable<TaskPost> {
    return this.http.request<TaskPost>("delete", this.link + "/api/v1/delete", {body: {id: id}})
  }

  postUpdateTask(id: number, date: Date, description: string, title: string): Observable<TaskPost> {
    return this.http.request<TaskPost>("post", this.link + "/api/v1/update", {body: {id: id, dateTime: date, Title: title, Description: description }})
  }

  

  getUser(id: number): Observable<UserGet> {
    return this.http.request<UserGet>("get", this.link + "/api/v2/get", {body: {id:id}})
  }

    postCreateUser(name: string, password: string): Observable<User> {
    return this.http.request<User>("post", this.link + "/api/v2/create", {body: {name: name, password: password}})
  }

  deleteTaskUser(id: number): Observable<UserDelete> {
    return this.http.request<UserDelete>("delete", this.link + "/api/v1/delete", {body: {id: id}})
  }

  postUpdateUpdate(id: number, name: string, password: string ): Observable<TaskPost> {
    return this.http.request<TaskPost>("post", this.link + "/api/v1/update", {body: {id: id, name: name, password: password }})
  }


}
