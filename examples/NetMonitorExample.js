/**
 * Copyright Schrodinger, LLC
 */

"use strict";

const FakeObjectDataListStore = require('./helpers/FakeObjectDataListStore');
const { TextCell, ImageCell, LinkCell, DateCell } = require('./helpers/cells');
const { Table, Column, Cell } = require('fixed-data-table-2');
const React = require('react');
const Dimensions = require('react-dimensions');

const FAKE_DATA_SIZE = 500;
const FAKE_DATA_ROW_INCREASE_SIZE = 5;
const FAKE_DATA_RECEIVE_PERIOD = 200;

class NetMonitorExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(FAKE_DATA_SIZE),
      dataSize: 1,
      columnWidths: {
        avatar: 50,
        firstName: 80,
        lastName: 80,
        sentence: 100,
        companyName: 100,
        city: 100,
        street: 100,
        zipCode: 80,
        email: 120,
        date: 100,
      },
    };

    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this._onScrollStart = this._onScrollStart.bind(this);
    this.scrollToBottom = true;
  }

  componentDidMount() {
    let id = setInterval(() => {
      let dataSize = this.state.dataSize + FAKE_DATA_ROW_INCREASE_SIZE;

      this.setState({
        dataList: new FakeObjectDataListStore(FAKE_DATA_SIZE),
        dataSize,
        scrollToRow: dataSize,
      });

      if (dataSize > this.state.dataList.getSize()) {
        clearInterval(id);
      }
    }, FAKE_DATA_RECEIVE_PERIOD);
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  _onScrollStart() {
    this.scrollToBottom = false;
    return false;
  }

  render() {
    let { dataList, columnWidths, dataSize } = this.state;
    let { height, width, containerHeight, containerWidth, ...props } = this.props;

    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={dataSize}
        scrollToRow={this.scrollToBottom ? dataSize : null}
        onScrollStart={this._onScrollStart}
        onColumnResizeEndCallback={this._onColumnResizeEndCallback}
        isColumnResizing={false}
        width={containerWidth}
        height={containerHeight}
        {...props}>
        <Column
          header={<Cell>Icon</Cell>}
          columnKey="avatar"
          cell={<ImageCell data={dataList} />}
          width={columnWidths.avatar}
          isResizable={true}
        />
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.firstName}
          isResizable={true}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.lastName}
          isResizable={true}
        />
        <Column
          columnKey="companyName"
          header={<Cell>Company</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.companyName}
          isResizable={true}
        />
        <Column
          columnKey="sentence"
          header={<Cell>Sentence</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.sentence}
          isResizable={true}
        />
        <Column
          columnKey="city"
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.city}
          isResizable={true}
        />
        <Column
          columnKey="street"
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.street}
          isResizable={true}
        />
        <Column
          columnKey="zipCode"
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList} />}
          width={columnWidths.zipCode}
          isResizable={true}
        />
        <Column
          columnKey="email"
          header={<Cell>Email</Cell>}
          cell={<LinkCell data={dataList} />}
          width={columnWidths.email}
          isResizable={true}
        />
        <Column
          columnKey="date"
          header={<Cell>DOB</Cell>}
          cell={<DateCell data={dataList} />}
          width={columnWidths.date}
          isResizable={true}
          flexGrow={1}
        />
      </Table>
    );
  }
}

module.exports = Dimensions({
  getHeight: function (element) {
    return window.innerHeight - 200;
  },
  getWidth: function (element) {
    var widthOffset = window.innerWidth < 680 ? 0 : 240;
    return window.innerWidth - widthOffset;
  }
})(NetMonitorExample);
