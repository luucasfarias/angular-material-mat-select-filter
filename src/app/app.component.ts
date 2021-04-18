import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { CreatePostService } from './create-post.service';
import { Post } from './model/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  text = 'Salvar';
  post: Post;
  dataPosts: Post[];

  constructor(private postService: CreatePostService) {}

  savePost() {
    this.post = {
      title: 'Angular carregamento',
      author: 'Lucas',
    };

    this.postService.newPost(this.post).subscribe((data) => {
      console.log(data);
    });
  }

  getPosts() {
    this.postService.loadPost().subscribe((data) => {
      this.dataPosts = data;
    });
  }
}
