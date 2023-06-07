import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskPost } from './task/task-post';
import { Task } from './task/task';
import { User } from './user/user';
import { UserDelete } from './user/user-delete';
import { UserGet } from './user/user-get';

@Injectable({
  providedIn: 'root',
})
export class DatabaseConnectionService {
  private readonly link: string = 'http://localhost:9090/api/v2';

  constructor(private http: HttpClient) {}

  fetchAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.link + '/task/get/all', {});
  }

  fetchInRangeTask(start: Date, end: Date): Observable<Task[]> {
    return this.http.request<Task[]>('get', this.link + '/task/get/range', {
      body: { start: start, end: end },
    });
  }

  fetchInDayTask(first: Date): Observable<Task> {
    const start = new Date(first.getDate());
    const end = new Date(first.getDate() + 1);
    return this.http.request<Task>('get', this.link + '/task/get/range', {
      body: { start: start, end: end },
    });
  }

  postCreateTask(
    date: Date,
    title: string,
    description: string,
    ownerId: number
  ): Observable<TaskPost> {
    return this.http.request<TaskPost>('post', this.link + '/task/create', {
      body: {
        dateTime: date.toISOString(),
        title: title,
        description: description,
        ownerId: ownerId,
      },
    });
  }

  deleteTask(id: number): Observable<TaskPost> {
    return this.http.delete<TaskPost>(this.link + '/task/delete', {
      params: { id: id },
    });
  }

  postUpdateTask(
    ownerId: number,
    taskId: number,
    date: Date,
    description: string,
    title: string
  ): Observable<TaskPost> {
    return this.http.request<TaskPost>('post', this.link + '/task/update', {
      body: {
        ownerId: ownerId,
        taskId: taskId,
        dateTime: date,
        title: title,
        description: description,
      },
    });
  }

  fetchAllTasksOfUser(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.link + '/task/getAll', {
      params: { userId: id },
    });
  }

  getUser(id: number): Observable<UserGet> {
    return this.http.request<UserGet>('get', this.link + '/user/get', {
      body: { id: id },
    });
  }

  postCreateUser(name: string, password: string): Observable<User> {
    return this.http.request<User>('post', this.link + '/user/create', {
      body: { name: name, password: password },
    });
  }

  deleteUser(id: number): Observable<UserDelete> {
    return this.http.request<UserDelete>('delete', this.link + '/user/delete', {
      body: { id: id },
    });
  }

  postUpdateUser(
    id: number,
    name: string,
    password: string
  ): Observable<UserDelete> {
    return this.http.request<UserDelete>('post', this.link + '/user/update', {
      body: { id: id, name: name, password: password },
    });
  }
}
