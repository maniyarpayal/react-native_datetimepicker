import { StyleSheet, Dimensions, Platform } from "react-native";
export const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812)
  );
};
const BORDER_RADIUS = 13;
const BACKGROUND_COLOR = "white";
const BORDER_COLOR = "#d5d5d5";
const TITLE_FONT_SIZE = 13;
const TITLE_COLOR = "#8f8f8f";
const BUTTON_FONT_WEIGHT = "normal";
const BUTTON_FONT_COLOR = "#007ff9";
const BUTTON_FONT_SIZE = 20;
let style = StyleSheet.create({
  contentContainer: {
    justifyContent: "flex-end",
    margin: 10
  },
  datepickerContainer: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    marginBottom: 8,
    overflow: "hidden"
  },
  titleContainer: {
    borderBottomColor: BORDER_COLOR,
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 14,
    backgroundColor: "transparent"
  },
  title: {
    textAlign: "center",
    alignSelf : 'center',
    color: TITLE_COLOR,
    fontSize: TITLE_FONT_SIZE
  },
  confirmButton: {
    borderColor: BORDER_COLOR,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: "transparent",
    height: 57,
    justifyContent: "center"
  },
  confirmText: {
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: BUTTON_FONT_WEIGHT,
    backgroundColor: "transparent"
  },
  cancelButton: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS,
    height: 57,
    marginBottom: isIphoneX() ? 20 : 0,
    justifyContent: "center"
  },
  cancelText: {
    padding: 10,
    textAlign: "center",
    color: BUTTON_FONT_COLOR,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: "600",
    backgroundColor: "transparent"
  },
  dateTouch: {
    width: '100%',
    height : '100%'
  },
  dateTouchBody: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateIcon: {
    width: 25,
    height: 25,
    marginLeft: 5,
    marginRight: 5,
   
  },
  dateInput: {
    flex: 1,
    height: '100%',
    // borderWidth: 1,
    // borderColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red' 
   },
  dateText: {
    color: '#333',
    alignSelf: 'center',
  },
  placeholderText: {
    color: '#c9c9c9',
    alignSelf: 'center',
  },

  datePicker: {
    marginTop: 42,
    borderTopColor: '#ccc',
    borderTopWidth: 1
  },
  disabled: {
    backgroundColor: '#eee'
  }
});

export default style;
