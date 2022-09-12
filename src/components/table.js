import {
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  TableCell,
  Box,
  Button,
  Typography,
} from '@material-ui/core'
import React from 'react'
import { Clock } from 'small-react-timer'
import Encounter from './encounter'

class NuzlockeTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      time: this.props.data.time || new Date(0),
      style: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        'vertical-align': 'middle'
      },
    }

    console.log('Debug: NuzlockeTable created with props:')
    console.log(props)

    this.timerChangeEvent = this.timerChangeEvent.bind(this)
  }

  timerChangeEvent(time) {
    this.setState((prevState) => ({
      time: time
    }))

    if (this.props.autosave) {
      this.props.db.save('games', {
        title: this.props.data.title,
        time: this.state.time})
    }
  }

  resetEncounterTime(index) {
    let newData = this.state.data
    newData.battleencounters[index].time = null

    this.setState((prevState) => ({
      data: newData,
    }))
  }

  render() {
    return (
      <Box component={Paper} textAlign="center" sx={this.state.style}>
        <Clock
          debug={false}
          auto={true}
          onTimerChange={this.timerChangeEvent}
          time={this.state.time}
        ></Clock>
        <Typography variant="h4">{this.props.data.title}</Typography>
        <TableContainer component={Paper}>
          <table>
            <TableBody>
              {this.props.data?.battleencounters?.map((encounter, index) => {
                var sprite = this.props.data.sprites.find((x) => x.name == encounter.opponent).url;
                var key = this.props.data.title + '_' + encounter.title;
                
                return <Encounter db={this.props.db} key={key} title={key} sprite={sprite} encounter={encounter} time={this.state.time} /> //God I hope the time is an object reference.
              })}
            </TableBody>
          </table>
        </TableContainer>
      </Box>
    )
  }
}

export default NuzlockeTable
