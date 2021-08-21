import './style.css'
import DatePicker from "./datepicker.js"
import './datepicker.css'

// var calendar = new DatePicker(document.getElementById('tt'));
// new DatePicker(document.getElementById('tt2'));



for (let index = 0; index < 100; index++) {
  let ele = document.createElement('input');
  document.body.append(ele);
  new DatePicker(ele);
  
  
  
}