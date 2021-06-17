import * as H from 'history';
import * as React from 'react';
import {Route, RouteComponentProps, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {WithDefaultProps} from '../core/default';
import {ChannelPlaylistForm} from './channel-playlists';
import {PlaylistForm} from './playlist';
import {VideosForm} from './videos';

interface AppProps {
  history: H.History;
  setGlobalState: (data: any) => void;
}

class StatelessApp extends React.Component<AppProps & RouteComponentProps<any>, {}> {
  render() {
    return (
      <React.Fragment>
        <Route path={this.props.match.url + '/channel'} exact={true} component={WithDefaultProps(ChannelPlaylistForm)} />
        <Route path={this.props.match.url + '/channel/playlist/:id'} exact={true} component={WithDefaultProps(PlaylistForm)} />
        <Route path={this.props.match.url + '/videos'} exact={true} component={WithDefaultProps(VideosForm)} />
      </React.Fragment>
    );
  }
}

const VideoRoutes = compose(
  withRouter,
)(StatelessApp);
export default VideoRoutes;
