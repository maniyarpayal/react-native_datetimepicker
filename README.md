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
