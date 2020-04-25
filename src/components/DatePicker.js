import React, {Component} from 'react';

import {View} from 'react-native';
import {Scrollpicker, Datepicker, BottomModal} from 'beeshell';
class DatePicker extends Component {
  static defaultProps = {
    title: '请选择日期',
    lits: [],
    type: 'day',
    startYear: 1990,
    numberOfYears: 50,
    changeVal: null,
    // isNow: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      monthList: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
      ],
      yearList: this.getYearList(),
      valueList: [0, 0],
      type: null,
    };
  }
  getYearList() {
    const yearList = [];
    // if (this.state.type === 'endTime') {
    //   yearList.push('至今');
    // }
    let startYear = this.props.startYear;
    const numberOfYears = this.props.numberOfYears;
    for (let i = 0; i < numberOfYears; i++) {
      startYear++;
      yearList.push(startYear);
    }
    return yearList;
  }
  renderSafeArea() {
    return (
      <View style={{maxHeight: 30}}>
        <View style={{flex: 1}}>
          <View style={{height: 60}} />
        </View>
      </View>
    );
  }
  open({value, type = null, key}) {
    let date = null;
    if (this.props.type === 'month') {
      date = global.dateMonth(new Date(value));
    } else {
      date = global.date2Str(new Date(value));
    }
    const yearList = this.state.yearList;
    if (type === 'endTime') {
      yearList.unshift('至今');
    }
    const valueList = date.split('/');
    const valueIdxList = this.state.valueList;
    const pickList = [this.state.yearList, this.state.monthList];
    pickList[0] = yearList;
    pickList.map((pick, idx) => {
      pick.find((item, index) => {
        if (item == valueList[idx]) {
          valueIdxList[idx] = index;
          // valueIdxList.push(index);
        }
        return item == valueList[idx];
      });
    });
    this.dateModal.open();
    this.setState({
      valueList: valueIdxList,
      type: type,
      key: key,
    });
  }
  close() {
    this.setState({
      yearList: this.getYearList(),
    });
    this.dateModal.close();
  }
  getPickList() {
    let pickList = [this.state.yearList, ['至今']];
    const yearIdx = this.state.valueList[0];
    debugger;
    if (this.state.yearList[yearIdx] !== '至今') {
      pickList = [this.state.yearList, this.state.monthList];
    }
    return pickList;
  }
  render() {
    const valueList = this.state.valueList;
    return (
      <BottomModal
        ref={c => {
          this.dateModal = c;
        }}
        title={this.props.title}
        rightCallback={() => {
          const yearList = this.state.yearList;
          const monthList = this.state.monthList;
          debugger;
          const date = [yearList[valueList[0]], monthList[valueList[1]]];
          const resVal = date.toString().replace(/,/g, '/');
          this.props.rightCallback({
            date: new Date(resVal).getTime(),
            key: this.state.key,
          });
        }}
        cancelable={true}>
        {this.props.type === 'month' ? (
          <Scrollpicker
            list={this.getPickList()}
            value={valueList}
            proportion={[1, 1]}
            onChange={(columnIndex, rowIndex) => {
              // const valueList = this.state.valueList;
              valueList[columnIndex] = rowIndex;
              this.setState({
                valueList: valueList,
              });
            }}
          />
        ) : (
          <View style={{paddingVertical: 15}}>
            <Datepicker
              style={{paddingHorizontal: 50}}
              proportion={[1, 1, 1]}
              startYear={2010}
              numberOfYears={10}
              date={this.props.value}
              onChange={value => {
                console.log('changeVal', value);
                // this.setState({
                //   date: value,
                // });
              }}
            />
          </View>
        )}
        {this.renderSafeArea()}
      </BottomModal>
    );
  }
}

export default DatePicker;
