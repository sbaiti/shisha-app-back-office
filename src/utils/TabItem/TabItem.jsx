import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './TabItem.css';


class TabItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: false
        }
    }

    priceFormatter = (cell, row) => {
        const { id } = row.props;
        const key = this.props.events.findIndex(((nbTable) => nbTable.props.id === id));
        return <img
            onClick={(e) => {
                e.preventDefault()
                this.props.imageClick(id, key);
            }
            }
            height="390"
            width="225"
            src={row.props.src} alt="event"
            className="img__small"
            id={row.props.id} >
        </img>;
    }

    render() {
        return (
            <div className="table__users" >
                <BootstrapTable
                    data={this.props.events}
                    hover
                    striped
                    tableHeaderClass='my-custom-class'
                    options={this.props.options}
                    maxHeight={this.props.heigth}
                >
                    <TableHeaderColumn
                        isKey dataField={this.props.type}
                        dataFormat={this.priceFormatter}
                        headerAlign='center'
                        dataAlign='center'
                        thStyle={{ width: '150px', 'height': '10px' }}
                        tdStyle={{ width: '150px', 'height': '30px' }}>{this.props.type}</TableHeaderColumn>
                </BootstrapTable>

            </div>
        )
    }
}



export default TabItem;