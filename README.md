@payal_maniyar/react-native_datetimepicker

[![npm (scoped)](https://img.shields.io/npm/v/@payal_maniyar/react-native_datetimepicker.svg)](https://www.npmjs.com/package/@payal_maniyar/react-native_datetimepicker)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@payal_maniyar/react-native_datetimepicker.svg)](https://www.npmjs.com/package/@payal_maniyar/react-native_datetimepicker)

Removes all spaces from a string.

## Install

```
$ npm install @payal_maniyar/react-native_datetimepicker
```

## Usage

```js
import DateTimePicker from '@payal_maniyar/react-native_datetimepicker';

 <DateTimePicker
        style = {
          {
            width: '100%',
            marginBottom: 8
          }
        }
        mode = "datetime" //{"datetime"}
        placeholder = "Pick a Date"
        format = "DD/M/YYYY HH:mm a"
        date = {
          this.state.date
        }
        minDate = {
          moment().add(10, 'years').format("DD/M/YYYY HH:mm a")
        }
        maxDate = {
          moment().subtract(10, 'years').format("DD/M/YYYY HH:mm a")
        }
        confirmBtnText = "Done"
        cancelBtnText = "Cancel"
        customStyles = {
          {
            dateIcon: {
              position: 'absolute',
              right: 0,
              marginLeft: 0
            },
            dateInput: {
              marginRight: 36,
              borderRadius: 5,
            }
            // ... You can check the source to find the other keys.
          }
        }
        onDateChange = {
          (date) =>
          this.setState({
            date: date
          })
        }

        />
```
## Properties


| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| style | - | `object` | Specify the style of the DateTimePicker container, eg. width, height,backgroundColor etc...  |
| date | - | <code>string &#124; date &#124; Moment instance</code> | Specify the display date of DatePicker. `string` type value must match the specified format |
| mode | 'date' | `enum` | The `enum` of `date`, `datetime` and `time` |
| androidMode | 'default' | `enum` | The `enum` of `default`, `calendar` and `spinner` (only Android) |
| format | 'YYYY-MM-DD' | `string` | Specify the display format of the date, which using [moment.js](http://momentjs.com/). The default value change according to the mode. |
| confirmBtnText | '确定' | `string` | Specify the text of confirm btn in ios. |
| cancelBtnText | '取消' | `string` | Specify the text of cancel btn in ios. |
| iconSource | - | <code>{uri: string} &#124; number</code> | Specify the icon. Same as the `source` of Image, always using `require()` |
| minDate | - | <code>string &#124; date</code> | Restricts the range of possible date values. |
| maxDate | - | <code>string &#124; date</code> | Restricts the range of possible date values. |
| duration | 300 | `number` | Specify the animation duration of datepicker.|
| customStyles | - | `object` | The hook of customize datepicker style, same as the native style. `dateTouchBody`, `dateInput`...|
| showIcon | true | `boolean` | Controller whether or not show the icon |
| hideText | false | `boolean` | Controller whether or not show the `dateText` |
| iconComponent | - | `element` | Set the custom icon |
| disabled | false | `boolean` | Controller whether or not disable the picker |
| is24Hour | - | `boolean` | Set the TimePicker is24Hour flag. The default value depend on `format`. Only work in Android |
| allowFontScaling | true | `boolean` | Set to false to disable font scaling for every text component |
| placeholder | '' | `string` | The placeholder show when this.props.date is falsy |
| onDateChange | - | `function` | This is called when the user confirm the picked date or time in the UI. The first and only argument is a date or time string representing the new date and time formatted by [moment.js](http://momentjs.com/) with the given format property. |
| onOpenModal | - | `function` | This is called when the DatePicker Modal open. |
| onCloseModal | - | `function` | This is called when the DatePicker Modal close |
| onPressMask | - | `function` | This is called when clicking the ios modal mask |
| getDateStr | - | Function | A function to override how to format the date into a `String` for display, receives a `Date` instance

### Property `customStyles` available keys

* appearance: `dateInput`, `disabled`, `dateTouchBody`, `dateIcon`, `placeholderText`, `dateText`
* ios select panel: `datePickerCon`, `datePicker`, `btnConfirm`, `btnTextConfirm`, `btnCancel`, `btnTextCancel`


## Instance Methods

| Method  | Params  | Description |
| :------------ |:---------------:| :---------------:|
| onPressDate | - | Manually open the date picker panel |
| onPressCancel | - | Manually close the date picker panel like, similarly pressing cancel btn |


