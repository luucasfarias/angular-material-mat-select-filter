import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from './model/post.model';

@Injectable({
  providedIn: 'root',
})
export class CreatePostService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000';

  newPost(postData: Post): Observable<Post> {
    return this.http
      .post<Post>(`${this.url}/posts`, postData)
      .pipe(
        tap((newPost: Post) => console.log(`added post w/ id=${newPost.title}`))
      );
  }

  loadPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/posts`);
  }
}
