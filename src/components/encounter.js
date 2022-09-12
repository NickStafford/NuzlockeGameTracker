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

        this.load = this.load.bind(this);

        this.state = {
            style: {
                alignItems: 'center',
                justifyContent: 'space-evenly',
                'text-align': 'center',
                color: 'red',
                'vertical-align': 'middle'
            }
        }
    }

    load() {
        debugger;
        this.props.db.getOrAdd(
            this.props?.db?.db,
            this.props?.title,
            'encounters',
            {
                "title": this.props?.title,
                "time": null //props holds the reference to the timer time.
            },
            (result) => {
                console.log('Updating encounter state...')
                debugger;

                this.setState((prevState) => ({
                    "title": this.props.title,
                    "time": result?.time
                    //props holds the reference to the timer time.
                }))
            }
        )
    }

    setEncounterTime(time) {
        this.props.db.save(
            'encounters',
            {
                "title": this.props.title,
                "time": time //props holds the reference to the timer time.
            });

        this.load();
    }

    componentDidMount() {
        this.load();
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
                <TableCell width="30%" align="center">
                    <b>Level {this.props.encounter.level}</b>
                    {this.props.encounter?.location ?
                        <>
                            <br /> {this.props.encounter.location}
                        </>
                        : ''}
                </TableCell>
                <TableCell width="40%">
                    {typeof this.state?.time?.toLocaleTimeString == 'function'
                        ? this.state?.time.toLocaleTimeString('en-GB', {
                            timeZone: 'UTC',
                        })
                        : '--:--:--'}
                </TableCell>
                <TableCell>
                    {this.state?.time > 0 ? (
                        <RotateLeftIcon
                            onClick={(e) => this.setEncounterTime(null)}
                        />
                    ) : (
                        <AddBoxIcon
                            onClick={(e) => this.setEncounterTime(this.props.time)}
                        />
                    )}
                </TableCell>
            </TableRow>
        )
    }
}

export default Encounter;