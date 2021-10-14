import { TableBody, TableContainer, TableRow, Paper, TableCell, Box } from '@material-ui/core';
import React from 'react';
import { Clock } from 'small-react-timer';
import AddBoxIcon from '@material-ui/icons/AddBox';

class NuzlockeTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data?.battleencounters,
            time: new Date(0)
        };

        this.timerChangeEvent = this.timerChangeEvent.bind(this);
        this.setEncounterTime = this.setEncounterTime.bind(this);
    }


    timerChangeEvent(time) {
        this.setState((prevState) => ({
            time: time
        }));
    }

    setEncounterTime(index) {
        let newData = this.state.data;
        newData[index].time = this.state.time;

        this.setState((prevState) => ({
            data: newData
        }));
    }

    render() {
        return (
            <Box component={Paper}>
                <Clock debug={false} auto={true} onTimerChange={this.timerChangeEvent}></Clock>
                <TableContainer component={Paper}>
                    <TableBody>
                        {this.state.data?.map((encounter, index) => (
                            <TableRow key={'Encounter'+index}>
                                <TableCell align="center" width="30%">
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <img src={this.props.data.sprites.find(sprite => sprite.name = encounter.opponent).url} alt=""></img>
                                        {encounter.opponent}
                                    </Box>
                                </TableCell>
                                <TableCell width="30%">Level {encounter.level}</TableCell>
                                <TableCell widh="40%">
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            justifyContent: 'space-evenly'
                                        }}
                                    >
                                        <span>{typeof encounter.time?.toLocaleTimeString == 'function' ? encounter.time.toLocaleTimeString('en-GB', { timeZone: 'UTC' }) : '--:--:--'}</span>
                                        {encounter.time ? '' : <AddBoxIcon onClick={(e) => this.setEncounterTime(index, e)}/>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </TableContainer>
            </Box>
        );
    }
}

export default NuzlockeTable;
