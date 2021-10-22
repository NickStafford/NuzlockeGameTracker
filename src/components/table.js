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
import AddBoxIcon from '@material-ui/icons/AddBox'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'

class NuzlockeTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      db: this.props.db,
      data: Object.defineProperty(this.props.data, 'time', {
        value: this.props.data.time || new Date(0),
        writable: true,
        enumerable: true,
      }),
      style: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        'vertical-align': 'middle',
        '& .MuiTableCell-root': {
          'line-height': '1px',
        },
      },
    }

    console.log('Debug: NuzlockeTable created with props:')
    console.log(props)

    this.timerChangeEvent = this.timerChangeEvent.bind(this)
    this.setEncounterTime = this.setEncounterTime.bind(this)
    this.resetEncounterTime = this.resetEncounterTime.bind(this)
  }

  timerChangeEvent(time) {
    this.setState((prevState) => {
      data: Object.assign(prevState.data, { time: time })
    })
  }

  setEncounterTime(index) {
    let newData = this.state.data
    newData.battleencounters[index].time = this.state.data.time

    this.setState((prevState) => ({
      data: newData,
    }))
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
          time={this.state.data.time}
        ></Clock>
        <Typography variant="h4">
          {this.state.data.title}
        </Typography>
        <TableContainer component={Paper}>
          <TableBody>
            {this.state.data?.battleencounters?.map((encounter, index) => (
              <TableRow key={'Encounter' + index}>
                <TableCell align="center" width="30%">
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <img
                      src={
                        this.state.data.sprites.find(
                          (sprite) => (sprite.name = encounter.opponent),
                        ).url
                      }
                      alt=""
                    ></img>
                    {encounter.opponent}
                  </Box>
                </TableCell>
                <TableCell width="30%">Level {encounter.level}</TableCell>
                <TableCell width="40%">
                  {typeof encounter.time?.toLocaleTimeString == 'function'
                    ? encounter.time.toLocaleTimeString('en-GB', {
                        timeZone: 'UTC',
                      })
                    : '--:--:--'}
                </TableCell>
                <TableCell>
                  {encounter.time ? (
                    <RotateLeftIcon
                      onClick={(e) => this.resetEncounterTime(index, e)}
                    />
                  ) : (
                    <AddBoxIcon
                      onClick={(e) => this.setEncounterTime(index, e)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableContainer>
        <Button
          variant="contained"
          onClick={(e) => this.state.db.save(this.state.data)}
        >
          Save
        </Button>
      </Box>
    )
  }
}

export default NuzlockeTable
