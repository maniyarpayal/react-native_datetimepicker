import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  DatePickerAndroid,
  TimePickerAndroid,
  DatePickerIOS,
  Platform,
  Animated,
  Keyboard,

} from 'react-native';
import ReactNativeModal from "react-native-modal";

import Style from './DatePickerStyle';
import moment from 'moment';

const FORMATS = {
    'date': 'YYYY-MM-DD',
    'datetime': 'YYYY-MM-DD HH:mm',
    'time': 'HH:mm'
  };
  
  const SUPPORTED_ORIENTATIONS = ['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right'];
  
  class DatePicker extends Component {
    constructor(props) {
      super(props);
      console.log("props = "+JSON.stringify(props))
      this.state = {
        date: this.getDate(),
        modalVisible: false,
        animatedHeight: new Animated.Value(0),
        allowPointerEvents: true,
        userIsInteractingWithPicker: false,
      };
  
      this.getDate = this.getDate.bind(this);
      this.getDateStr = this.getDateStr.bind(this);
      this.datePicked = this.datePicked.bind(this);
      this.onPressDate = this.onPressDate.bind(this);
      this.onPressCancel = this.onPressCancel.bind(this);
      this.onPressConfirm = this.onPressConfirm.bind(this);
      this.onDateChange = this.onDateChange.bind(this);
      this.onPressMask = this.onPressMask.bind(this);
      this.onDatePicked = this.onDatePicked.bind(this);
      this.onTimePicked = this.onTimePicked.bind(this);
      this.onDatetimePicked = this.onDatetimePicked.bind(this);
      this.onDatetimeTimePicked = this.onDatetimeTimePicked.bind(this);
      this.setModalVisible = this.setModalVisible.bind(this);
    }
  
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.date !== this.props.date) {

    //     this.setState({date: this.getDate(nextProps.date)});
    //   }
    // }
  
    setModalVisible(visible) {
      const {height, duration} = this.props;
  
      // slide animation
      if (visible) {
        this.setState({modalVisible: visible});
        return Animated.timing(
          this.state.animatedHeight,
          {
            toValue: height,
            duration: duration
          }
        ).start();
      } else {
        return Animated.timing(
          this.state.animatedHeight,
          {
            toValue: 0,
            duration: duration
          }
        ).start(() => {
          this.setState({modalVisible: visible});
        });
      }
    }
  
    onStartShouldSetResponder(e) {
      return true;
    }
  
    onMoveShouldSetResponder(e) {
      return true;
    }
  
    onPressMask() {
      if (typeof this.props.onPressMask === 'function') {
        this.props.onPressMask();
      } else {
        this.onPressCancel();
      }
    }
  
    onPressCancel() {
      this.setModalVisible(false);
  
      if (typeof this.props.onCloseModal === 'function') {
        this.props.onCloseModal();
      }
    }
  
    onPressConfirm() {
      this.datePicked();
      this.setModalVisible(false);
  
      if (typeof this.props.onCloseModal === 'function') {
        this.props.onCloseModal();
      }
    }
  
    getDate(date = this.props.date) {
      const {mode, minDate, maxDate, format = FORMATS[mode]} = this.props;
      console.log("date props = "+date)
      // date默认值
      if (!date || date == '') {
        let now = new Date();
        if (minDate) {
          let _minDate = this.getDate(minDate);
  
          if (now < _minDate) {
            return _minDate;
          }
        }
  
        if (maxDate) {
          let _maxDate = this.getDate(maxDate);
  
          if (now > _maxDate) {
            return _maxDate;
          }
        }
        console.log("return now = "+now.toDateString)
        return now;
      }
  
      if (date instanceof Date) {
        console.log("return date = "+date.toDateString)
        return date;
      }
      console.log("Date received is  = "+date)
      console.log("moment(date, format).toDate() = "+moment(date, format).toDate())
      return moment(date, format).toDate();
    }
  
    getDateStr(date = this.props.date) {
      
      
      const {mode, format = FORMATS[mode]} = this.props;
  
      const dateInstance = date instanceof Date
        ? date
        : this.getDate(date);
     
      if (typeof this.props.getDateStr === 'function') {
        console.log("in if")
        return this.props.getDateStr(dateInstance);
      }
     
      return moment(dateInstance).format(format);
    }
  
    datePicked() {
      console.log("date picked")
      if (typeof this.props.onDateChange === 'function') {
        console.log("this.state.date = "+this.state.date)

        this.props.onDateChange(this.getDateStr(this.state.date)/*, this.state.date*/);
      }
    }
  
    getTitleElement() {
      const {date, placeholder, customStyles, allowFontScaling} = this.props;

      if (!date && placeholder) {

        return (
          <Text allowFontScaling={allowFontScaling} style={[Style.placeholderText, customStyles.placeholderText]}>
            {placeholder}
          </Text>
        );
      }
      return (
        <Text allowFontScaling={allowFontScaling} style={[Style.dateText, customStyles.dateText]}>
          
           {this.getDateStr()} 
        </Text>
      );
    }
  
    onDateChange(date) {
      this.setState({
        allowPointerEvents: false,
        date: date
      });
      const timeoutId = setTimeout(() => {
        this.setState({
          allowPointerEvents: true
        });
        clearTimeout(timeoutId);
      }, 200);
    }
  
    onDatePicked({action, year, month, day}) {
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          date: new Date(year, month, day)
        });
        this.datePicked();
      } else {
        this.onPressCancel();
      }
    }
  
    onTimePicked({action, hour, minute}) {
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          date: moment().hour(hour).minute(minute).toDate()
        });
        this.datePicked();
      } else {
        this.onPressCancel();
      }
    }
  
    onDatetimePicked({action, year, month, day}) {
      const {mode, androidMode, format = FORMATS[mode], is24Hour = !format.match(/h|a/)} = this.props;
  
      if (action !== DatePickerAndroid.dismissedAction) {
        let timeMoment = moment(this.state.date);
  
        TimePickerAndroid.open({
          hour: timeMoment.hour(),
          minute: timeMoment.minutes(),
          is24Hour: is24Hour,
          mode: androidMode
        }).then(this.onDatetimeTimePicked.bind(this, year, month, day));
      } else {
        this.onPressCancel();
      }
    }
  
    onDatetimeTimePicked(year, month, day, {action, hour, minute}) {
      if (action !== DatePickerAndroid.dismissedAction) {
        this.setState({
          date: new Date(year, month, day, hour, minute)
        });
        this.datePicked();
      } else {
        this.onPressCancel();
      }
    }
    onPressMask() {
        if (typeof this.props.onPressMask === 'function') {
          this.props.onPressMask();
        } else {
          this.onPressCancel();
        }
      }
    
      onPressCancel() {
        this.setModalVisible(false);
    
        if (typeof this.props.onCloseModal === 'function') {
          this.props.onCloseModal();
        }
      }
    onPressDate() {
      if (this.props.disabled) {
        return true;
      }
  
      Keyboard.dismiss();
  
      // reset state
      this.setState({
        date: this.getDate()
      });
  
      if (Platform.OS === 'ios') {
        this.setModalVisible(true);
      } else {
  
        const {mode, androidMode, format = FORMATS[mode], minDate, maxDate, is24Hour = !format.match(/h|a/)} = this.props;
  
        // 选日期
        if (mode === 'date') {
          DatePickerAndroid.open({
            date: this.state.date,
            minDate: minDate && this.getDate(minDate),
            maxDate: maxDate && this.getDate(maxDate),
            mode: androidMode
          }).then(this.onDatePicked);
        } else if (mode === 'time') {
          // 选时间
  
          let timeMoment = moment(this.state.date);
  
          TimePickerAndroid.open({
            hour: timeMoment.hour(),
            minute: timeMoment.minutes(),
            is24Hour: is24Hour,
            mode: androidMode
          }).then(this.onTimePicked);
        } else if (mode === 'datetime') {
          // 选日期和时间
  
          DatePickerAndroid.open({
            date: this.state.date,
            minDate: minDate && this.getDate(minDate),
            maxDate: maxDate && this.getDate(maxDate),
            mode: androidMode
          }).then(this.onDatetimePicked);
        }
      }
  
      if (typeof this.props.onOpenModal === 'function') {
        this.props.onOpenModal();
      }
    }
  
    _renderIcon() {
      const {
        showIcon,
        iconSource,
        iconComponent,
        customStyles
      } = this.props;
  
      if (showIcon) {
        if (iconComponent) {
          return iconComponent;
        }
        return (
          <Image
            style={[Style.dateIcon, customStyles.dateIcon]}
            source={iconSource}
            resizeMode="contain"
          />
        );
      }
  
      return null;
    }
    componentWillReceiveProps(nextProps) {
        // if (this.props.date !== nextProps.date) {
        //   this.setState({
        //     date: nextProps.date
        //   });
        // }
        console.log("nextProps.date = "+nextProps.date)
        console.log("this.props.date = "+this.props.date)
        if (nextProps.date !== this.props.date) {
          this.setState({date: this.getDate(nextProps.date)});
        }
      }

      _handleOnModalHide = () => {
        if (this.confirmed) {
          this.props.onHideAfterConfirm(this.state.date);
        }
      };
      _handleUserTouchInit = () => {
        // custom date picker shouldn't change this param
        if (!this.props.customDatePickerIOS) {
          this.setState({
            userIsInteractingWithPicker: true
          });
        }
        return false;
      };
     
      
    render() {
      const {
       
        contentContainerStyleIOS,
        mode,
        style,
        customConfirmButtonIOS,
        customStyles,
        disabled,
        minDate,
        maxDate,
        minuteInterval,
        timeZoneOffsetInMinutes,
        titleIOS,
        reactNativeModalPropsIOS,
        cancelTextIOS,
        
        datePickerContainerStyleIOS,
        customTitleContainerIOS,
        customDatePickerIOS,
        
        testID,
        customCancelButtonIOS,
        confirmTextIOS,
        confirmTextStyle,
        titleStyle,
        neverDisableConfirmIOS,
        cancelTextStyle,
       
        confirmBtnTestID,
        
        locale
      } = this.props;
  
      const dateInputStyle = [
        Style.dateInput, customStyles.dateInput,
        disabled && Style.disabled,
        disabled && customStyles.disabled
      ];
  
      const titleContainer = (
        <View style={Style.titleContainer}>
          <Text style={[Style.title, titleStyle]}>{titleIOS}</Text>
        </View>
      );
      let confirmButton;
  
      // Interested PR: https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/40
      // Issue on React-Native: https://github.com/facebook/react-native/issues/8169
      // Up until now when the user interacted with the picker, if he tapped on the confirm button,
      // the state was not yet changed and thus the picked value would be old and miss-leading.
      // DatePickerIOS does not update on the fly, and before it even manages to dispatch an update,
      // our component is unmounted and thus the state is lost.
      // We no longer allow our user to tap the confirm button unless the picker is still.
      // They can always tap the cancel button anyway.
      if (customConfirmButtonIOS) {
        if (
          customConfirmButtonWhileInteractingIOS &&
          this.state.userIsInteractingWithPicker
        ) {
          confirmButton = customConfirmButtonWhileInteractingIOS;
        } else {
          confirmButton = customConfirmButtonIOS;
        }
      } else {
        confirmButton = (
          <Text style={[Style.confirmText, confirmTextStyle]}>
            {confirmTextIOS}
          </Text>
        );
      }
      const cancelButton = (
        <Text style={[Style.cancelText, cancelTextStyle]}>{cancelTextIOS}</Text>
      );
    
      return (
        <TouchableHighlight
          style={[Style.dateTouch, style]}
          underlayColor={'transparent'}
          onPress={this.onPressDate}
          testID={testID}
        >
        <View >
          <View style={[Style.dateTouchBody, customStyles.dateTouchBody]}>
             {
              !this.props.hideText ?
                <View style={[dateInputStyle,{width:'100%'}]}>
                  {this.getTitleElement()}
                </View>
              :
                <View/>
            }
            {this._renderIcon()} 
            {Platform.OS === 'ios' && (
           
                <ReactNativeModal
        isVisible={this.state.modalVisible}
        style={[Style.contentContainer, contentContainerStyleIOS]}
        onModalHide={this._handleOnModalHide}
        onModalShow={() => {
          this.setState({
            minuteInterval
          });
        }}
        backdropOpacity={0.4}
        {...reactNativeModalPropsIOS}
      >
        <View style={[Style.datepickerContainer, datePickerContainerStyleIOS]}>
          {customTitleContainerIOS || titleContainer}
          <View
            onStartShouldSetResponderCapture={
              neverDisableConfirmIOS !== true ? this._handleUserTouchInit : null
            }
          >
           <DatePickerIOS
            date={this.state.date}
            mode={mode}
            minimumDate={minDate && this.getDate(minDate)}
            maximumDate={maxDate && this.getDate(maxDate)}
            onDateChange={this.onDateChange}
            minuteInterval={minuteInterval}
            timeZoneOffsetInMinutes={timeZoneOffsetInMinutes ? timeZoneOffsetInMinutes : null}
                        style={[Style.datePicker, customStyles.datePicker]}
                        locale={locale}
                      />
          </View>
          <TouchableHighlight
            style={Style.confirmButton}
            underlayColor="#ebebeb"
            onPress={this.onPressConfirm}
            
                      testID={confirmBtnTestID}
            
          >
             {confirmButton}
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          style={Style.cancelButton}
          underlayColor="#ebebeb"
          onPress = {this.onPressCancel}
         
        >
          {customCancelButtonIOS || cancelButton}
        </TouchableHighlight>
            </ReactNativeModal>)}
          </View>
          </View>
          </TouchableHighlight>
      );
    }
  }
  
  DatePicker.defaultProps = {
    mode: 'date',
    androidMode: 'default',
    date: '',
    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    height: 259,
  
    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    confirmTextIOS: "Done",
    cancelTextIOS: "Cancel",
    iconSource: require('./calendar.png'),
    customStyles: {},
    titleIOS: "Pick a date",
    // whether or not show the icon
    showIcon: true,
    disabled: false,
    allowFontScaling: true,
    hideText: false,
    placeholder: '',
    TouchableComponent: TouchableHighlight,
    modalOnResponderTerminationRequest: e => true
  };
  
  DatePicker.propTypes = {
    mode: PropTypes.oneOf(['date', 'datetime', 'time']),
    androidMode: PropTypes.oneOf(['clock', 'calendar', 'spinner', 'default']),
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date), PropTypes.object]),
    format: PropTypes.string,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    height: PropTypes.number,
    duration: PropTypes.number,

 
    iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    iconComponent: PropTypes.element,
    customStyles: PropTypes.object,
    showIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    onDateChange: PropTypes.func,
    onOpenModal: PropTypes.func,
    onCloseModal: PropTypes.func,
    onPressMask: PropTypes.func,
    placeholder: PropTypes.string,
    modalOnResponderTerminationRequest: PropTypes.func,
    is24Hour: PropTypes.bool,
    getDateStr: PropTypes.func,
    locale: PropTypes.string
  };
  
  export default DatePicker;
  