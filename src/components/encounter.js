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
import AddBoxIcon from '@material-ui/icons/AddBox'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import React from 'react'

class Encounter extends React.Component {
    constructor(props) {
        super(props)

        console.log('Debug: New encounter component created:')
        console.log(props);
    }

    resetEncounterTime(){

    }

    setEncounterTime() {
    }

    render() {
        return (
            <TableRow>
                <TableCell align="center" width="30%">
                    <Box>
                        <img
                            src={this.props.sprite + ''}
                        ></img>
                        {this.props.encounter.title}
                    </Box>
                </TableCell>
                <TableCell width="30%">Level {this.props.encounter.level}</TableCell>
                <TableCell width="40%">
                    {typeof this.props.encounter.time?.toLocaleTimeString == 'function'
                        ? this.props.encounter.time.toLocaleTimeString('en-GB', {
                            timeZone: 'UTC',
                        })
                        : '--:--:--'}
                </TableCell>
                <TableCell>
                    {this.props.encounter.time ? (
                        <RotateLeftIcon
                            onClick={(e) => this.resetEncounterTime(e)}
                        />
                    ) : (
                        <AddBoxIcon
                            onClick={(e) => this.setEncounterTime(e)}
                        />
                    )}
                </TableCell>
            </TableRow>
        )
    }
}

export default Encounter;