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
  render () {
    const { classes } = this.props
    const twitchProm = new Promise((resolve, reject) => {
      if (this.state.url.includes('https://www.twitch.tv/')) {
        const newURL = `${this.state.url.replace(
          'https://www',
          'https://player'
        ).replace(
          'twitch.tv/',
          'twitch.tv/?channel='
        )}&parent=localhost`
        console.log(newURL)
        return resolve(
          <iframe
            src={newURL}
            frameBorder="0"
            scrolling="no"
            height="378"
            width="620"
          />,
        )
      } else {
        return reject(
          <h1>404 ERROR</h1>,
        )
      }
    })
    // "https://player.twitch.tv/?channel=welovegames&parent=localhost"
    const prom = () => {
      twitchProm.then((massage) => {
        return massage
      }).catch((massage) => {
        return massage
      })
    }

  const click = () => {
    if (this.state.isSubmitted) {
      return (
        {prom}
      )
    } else {
    return null
    }
  }

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
    {click}
  </div>
)}


}

export default withStyles(styles)(App)
