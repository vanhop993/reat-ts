import * as React from 'react';
import {HistoryProps} from 'react-onex';
import {storage, StringMap} from 'uione';
import {Video} from 'video-plus';
import {context} from './app';

interface VideosState {
  title?: string;
  videos: Video[];
}

export class VideosForm extends React.Component<HistoryProps, VideosState> {
  constructor(props: HistoryProps) {
    super(props);
    this.resource = storage.resource().resource();
    this.getVideos = context.videoService.getVideos;
    this.state = {
      videos: []
    };
  }
  protected resource: StringMap = {};
  protected getVideos: (ids: string[], noSnippet?: boolean) => Promise<Video[]>;

  componentWillMount() {
    const ids = ['FxMVOa1kzw4', 'A7K139op-oU', 'u1qKjn68PWE', '8twOz-e87zc'];
    this.getVideos(ids).then(videos => this.setState({videos}));
  }

  render() {
    const resource = this.resource;
    const {videos} = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2 className='label'>{resource.welcome_title}</h2>
        </header>
        <ul className='row list-view'>
          {videos && videos.map((item, i) => {
            return (
              <li key={i} className='col s12 m6 l4 xl3'>
                <img src={item.thumbnail}/>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <button className='btn-detail'/>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
