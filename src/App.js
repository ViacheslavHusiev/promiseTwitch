import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import PageviewIcon from '@material-ui/icons/Pageview';

const styles = () => ({
  App: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    marginBottom: 5,
    '& > *': {
      marginTop: 20,
      width: '600px',
    },
  },
})

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      isSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClickOpenVideo = this.handleClickOpenVideo.bind(this)
    this.handleClickCloseVideo = this.handleClickCloseVideo.bind(this)
    this.twitchPlayer = this.twitchPlayer.bind(this)
  }
  handleChange(event) {
    this.setState({
      url: event.target.value
    });
  }
  handleClickOpenVideo() {
    this.setState({
      isSubmitted: true
    })
  }
  handleClickCloseVideo() {
    this.setState({
      isSubmitted: false,
      url: ''
    })
  }
  twitchPlayer(){
    const newURL = `https://player.twitch.tv/?channel=${this.state.url}&parent=localhost`
    return fetch(newURL)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
    }).catch((error) => {
      console.error(error)
    })
  }

  render () {
    const { classes } = this.props

    return (
  <div className={classes.App}>
    <form className={classes.input} autoComplete="off">
      <TextField
        id="standard-basic"
        type="text"
        variant="outlined"
        value={this.state.url}
        onChange={this.handleChange}
      />
    </form>
    <div>
      <IconButton
        onClick={this.handleClickOpenVideo}
      >
        <PageviewIcon />
      </IconButton>
      <IconButton
        onClick={this.handleClickCloseVideo}
      >
        <CloseIcon />
      </IconButton>
    </div>
    {this.state.isSubmitted && this.twitchPlayer()}
  </div>
)}
}

export default withStyles(styles)(App)
