import axios from 'axios';
import {HttpRequest} from 'axios-core';
import {VideoService, YoutubeClient} from 'video-plus';

class ApplicationContext {
  private readonly httpRequest = new HttpRequest(axios);
  readonly videoService: VideoService = new YoutubeClient('AIzaSyDID5lQvAJP3xYTI7GbUd7IZneOkbhWEsw', this.httpRequest);
}

export const context = new ApplicationContext();
