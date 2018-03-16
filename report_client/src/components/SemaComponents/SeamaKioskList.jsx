import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "aqua",
        padding:0
    },
});

const options = [
    'Kiosk 1',
    'Kiosk 2',
    'Kiosk 3',
    'Kiosk 4',
];

class SeamaKioskList extends React.Component {
    state = {
        anchorEl: null,
        selectedIndex: 1,
    };

    button = undefined;

    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ selectedIndex: index, anchorEl: null });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        return (
            <div className={classes.root} style={{height:"60px", width:"150px", marginLeft:"70%", position:"absolute", top:10}}>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="Kiosk"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary="Kiosk"
                            secondary={options[this.state.selectedIndex]}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 0}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

SeamaKioskList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeamaKioskList);
