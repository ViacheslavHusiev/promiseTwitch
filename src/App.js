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
      title: '',
      isSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClickOpenVideo = this.handleClickOpenVideo.bind(this)
    this.handleClickCloseVideo = this.handleClickCloseVideo.bind(this)
  }
  handleChange(event) {
    this.setState({
      title: event.target.value
    });
  }
  handleClickOpenVideo() {
    this.setState(state => ({
      isSubmitted: true
    }))
  }
  handleClickCloseVideo() {
    this.setState(state => ({
      isSubmitted: false
    }))
  }

render () {
  const { classes } = this.props
  const twitchProm = new Promise((resolve, reject) =>{
    if (this.state.title.includes('https://www.twitch.tv/')) {
      resolve(
        <iframe
          src={this.state.title}
          frameBorder="0"
          scrolling="no"
          height="378"
          width="620"
        />
      )
    } else {
      reject (
        <h1>404 ERROR</h1>
      )
    }
  })
  const prom = () => {
    twitchProm.then((massage) => {
      return massage
    }).catch((massage) => {
      return massage
    })
  }

    return (
  <div className={classes.App}>
    <form className={classes.input} autoComplete="off">
      <TextField
        id="standard-basic"
        type="text"
        variant="outlined"
        value={this.state.title}
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
    {this.state.isSubmitted
      ?
      <div>
        {prom}
      </div>
      :
      <div/>
    }
  </div>
)}


}

export default withStyles(styles)(App)
