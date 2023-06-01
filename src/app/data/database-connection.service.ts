import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TaskPost } from '../main-page/task/task-post';
import { Task } from '../main-page/task/task'
import { User } from '../main-page/user/user';
import { UserDelete } from '../main-page/user/user-delete';
import { UserGet } from '../main-page/user/user-get';

@Injectable({
  providedIn: 'root'
})
export class DatabaseConnectionService {
  private readonly link: string = "http://localhost:9090"

  constructor(private http: HttpClient) { }

  fetchAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.link + "/api/v2/task/get/all", {});
  }

  fetchInRangeTask(start: Date, end: Date): Observable<Task[]> {
    return this.http.request<Task[]>("get", this.link + "/api/v2/task/get/range", { body: { start: start, end: end } })
  }

  fetchInDayTask(first: Date): Observable<Task> {
    const start = new Date(first.getDate())
    const end = new Date(first.getDate() + 1)
    return this.http.request<Task>("get", this.link + "/api/v2/task/get/range", { body: { start: start, end: end } })
  }

  postCreateTask(date: Date, title: string, description: string, ownerId: number): Observable<TaskPost> {
    return this.http.request<TaskPost>("post", this.link + "/api/v2/task/create", { body: { dateTime: date, title: title, description: description, ownerId: ownerId } })
  }

  deleteTask(id: number): Observable<TaskPost> {
    return this.http.delete<TaskPost>(this.link + "/api/v2/task/delete", { params: {id: id} })
  }

  postUpdateTask(ownerId: number, taskId: number, date: Date, description: string, title: string): Observable<TaskPost> {
    return this.http.request<TaskPost>("post", this.link + "/api/v2/task/update", { body: { ownerId: ownerId, taskId: taskId, dateTime: date, title: title, description: description } })
  }

  fetchAllTasksOfUser(id: number): Observable<Task[]>{
    return this.http.get<Task[]>(this.link + "/api/v2/task/getAll", {params: {userId: id}})
  }

  getUser(id: number): Observable<UserGet> {
    return this.http.request<UserGet>("get", this.link + "/api/v2/user/get", { body: { id: id } })
  }

  postCreateUser(name: string, password: string): Observable<User> {
    return this.http.request<User>("post", this.link + "/api/v2/user/create", { body: { name: name, password: password } })
  }

  deleteUser(id: number): Observable<UserDelete> {
    return this.http.request<UserDelete>("delete", this.link + "/api/v2/user/delete", { body: { id: id } })
  }

  postUpdateUser(id: number, name: string, password: string): Observable<UserDelete> {
    return this.http.request<UserDelete>("post", this.link + "/api/v2/user/update", { body: { id: id, name: name, password: password } })
  }


}
