import * as React from 'react';
import {buildId, HistoryProps} from 'react-onex';
import {storage, StringMap} from 'uione';
import {PlaylistVideo, Video} from 'video-plus';
import {context} from './app';

interface PlaylistState {
  id?: string;
  title?: string;
  description?: string;
  keyword: string;
  allVideos: PlaylistVideo[];
  videos: PlaylistVideo[];
  video?: PlaylistVideo;
}

function buildShownVideos(keyword: string, allVideos: PlaylistVideo[]): PlaylistVideo[] {
  if (!keyword || keyword === '') {
    return allVideos;
  }
  const w = keyword.toLowerCase();
  const shownVideos = allVideos.filter(i => i.title.toLowerCase().includes(w));
  return shownVideos;
}
export class PlaylistForm extends React.Component<HistoryProps, PlaylistState> {
  constructor(props: HistoryProps) {
    super(props);
    this.back = this.back.bind(this);
    this.resource = storage.resource().resource();
    this.getPlaylist = context.videoService.getPlaylist;
    this.state = {
      keyword: '',
      videos: [],
      allVideos: []
    };
  }
  protected resource: StringMap = {};
  protected getPlaylist: (playlistId: string, max?: number) => Promise<PlaylistVideo[]>;

  componentWillMount() {
    const id = buildId<string>(this.props);
    this.getPlaylist(id).then(videos => this.setState({videos, allVideos: videos}));
  }
  back(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (e) {
      e.preventDefault();
    }
    this.props.history.goBack();
  }
  keywordOnChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    const { allVideos } = this.state;
    const videos = buildShownVideos(keyword, allVideos);
    this.setState({keyword, videos});
  }
  view = (e: any, video: PlaylistVideo) => {
    this.setState({video});
  }
  render() {
    const resource = this.resource;
    const {keyword, videos, video} = this.state;
    const show: boolean = (video != null && video !== undefined);
    return (
      <div className='view-container'>
        <header>
          <button type='button' id='btnBack' name='btnBack' className='btn-back' onClick={this.back} />
          <h2>{resource.welcome_title}</h2>
        </header>
        <div className={show ? 'list-detail-container' : ''}>
          <div className={show ? 'list-content' : ''}>
            <form id='playlistForm' name='playlistForm'>
              <section className='row search-group'>
                <label className='col s12 search-input'>
                  <i className='btn-search' />
                  <input type='text'
                    id='keyword'
                    name='keyword'
                    onChange={this.keywordOnChanged}
                    value={keyword}
                    maxLength={40}
                    placeholder={resource.role_assignment_search_user} />
                </label>
              </section>
            </form>
            <form className='list-result'>
              <ul className='row list-view'>
                {videos && videos.map((item, i) => {
                  return (
                    <li key={i} className={'col s12 m6 l4 xl3 card'} onClick={e => this.view(e, item)}>
                      <section>
                        <img src={item.highThumbnail} className='cover'/>
                        <h4>{item.title}</h4>
                      </section>
                    </li>
                  );
                })}
              </ul>
            </form>
          </div>
          {video && <div className='detail-content'>
            <form id='videoForm' name='videoForm'>
              <div className='video-container'>
                <div>
                  <img src={video.standardThumbnail}/>
                </div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </form>
          </div>}
        </div>
      </div>
    );
  }
}
