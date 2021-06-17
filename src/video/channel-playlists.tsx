import Carousel from 'src/newFolder/carousel/Carousel';
import CarouselVideoItems from 'src/newFolder/carousel/CarouselVideoItems';

import * as React from 'react';
import {HistoryProps} from 'react-onex';
import {storage, StringMap} from 'uione';
import {Playlist} from 'video-plus';
import {context} from './app';

interface PlaylistsState {
  channelId?: string;
  channelTitle?: string;
  playlists: Playlist[];
  allPlaylists: Playlist[];
  keyword?: string;
}

const dataRender = [
  {
    id: 1,
    name: 'video1',
    type: 'video',
    poster:
      'https://drive.google.com/u/0/uc?id=1MNP066rl1dKdZ4uHHY0Swf02vw6JLcUc&export=download',
    srcVideo:
      'https://drive.google.com/u/0/uc?id=1y7fG_6G8gTzHSmmahD8fOxdlyE6lwNTZ&export=download',
  },
  {
    id: 2,
    name: 'video2',
    type: 'video',
    poster:
      'https://drive.google.com/u/0/uc?id=1sIa-qnmC8DYC6jae-v6-PwnSwTnV5tMs&export=download',
    srcVideo:
      'https://drive.google.com/u/0/uc?id=1CDyt8NhBt4ENS_8eMNxi4g3M_Y91wjc9&export=download',
  },
  {
    id: 3,
    type: 'image',
    name: 'image1',
    srcImage:
      'https://drive.google.com/u/0/uc?id=1w5mM43fcganaJ4cmGx_-jtVDmP6Pl4yW&export=download',
  },
];

function buildShownPlaylists(keyword: string, allPlaylists: Playlist[]): Playlist[] {
  if (!keyword || keyword === '') {
    return allPlaylists;
  }
  const w = keyword.toLowerCase();
  const shownPlaylists = allPlaylists.filter(i => i.title.toLowerCase().includes(w) || i.description && i.description.toLowerCase().includes(w));
  return shownPlaylists;
}
export class ChannelPlaylistForm extends React.Component<HistoryProps, PlaylistsState> {
  constructor(props: HistoryProps) {
    super(props);
    this.resource = storage.resource().resource();
    this.getPlaylists = context.videoService.getPlaylists;
    this.state = {
      keyword: '',
      playlists: [],
      allPlaylists: [],
    };
  }
  protected resource: StringMap = {};
  protected getPlaylists: (channelId: string, max?: number) => Promise<Playlist[]>;

  componentWillMount() {
    this.getPlaylists('UCH5_L3ytGbBziX0CLuYdQ1Q').then(playlists => { // UCBkqDNqao03ldC3u78-Pp8g
      if (this.state.keyword === '') {
        this.setState({playlists, allPlaylists: playlists});
      }
    });
  }
  view = (e: any, id: string) => {
    e.preventDefault();
    this.props.history.push(`channel/playlist/${id}`);
  }
  keywordOnChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    const { allPlaylists } = this.state;
    const playlists = buildShownPlaylists(keyword, allPlaylists);
    this.setState({keyword, playlists});
  }
  render() {
    const resource = this.resource;
    const {playlists, keyword} = this.state;
    return (
      <div className='view-container'>
        <header>
          <h2>{resource.welcome_title}</h2>
        </header>
        <div>
          <form id='playlistsForm' name='playlistsForm'>
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
            <li className='col s12 m6 l4 xl3 card'>
                    <section>
                      <div className='cover'>
                        <i style={{zIndex: 2}}>item.itemCount</i>
                        <Carousel infiniteLoop={true}>
                          {dataRender.map((item, index) => {
                              switch (item.type) {
                                case 'video':
                                  return (
                                      <CarouselVideoItems key={index} item={item}/>
                                  );
                                case 'image':
                                  return (
                                      <img src={item.srcImage} key={index} alt={item.name} />
                                  );
                              }
                            })}
                        </Carousel>
                      </div>
                      <h3>item.title</h3>
                      <p>item.description</p>
                    </section>
                  </li>
              {playlists && playlists.map((item, i) => {
                return (
                  <li key={i} className='col s12 m6 l4 xl3 card' onClick={e => this.view(e, item.id)}>
                    <section>
                      <div className='cover'>
                        <i>{item.itemCount}</i>
                        <img src={item.highThumbnail}/>
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </section>
                  </li>
                );
              })}
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
