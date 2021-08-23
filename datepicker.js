export default class DatePicker{

  constructor(ele){

    
    this.input_ele = ele;
    this.root = document.createElement('DIV');
    this.root.className="calendar";

/*     this.root.style.top = 200;
    this.root.style.left = 200; */
    this.root.hidden = true;
    this.root.innerHTML = `
        <div class="title">  
        <a href="#" class="prev_year">&#171;</a>
        <a href="#" class="prev_month">&#139;</a>
        <span>October 2021</span>
        <a href="#" class="next_month">&#155;</a>
        <a href="#" class="next_year">&#187;</a>
    </div>
    <div class="days">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
    </div>        
    `;    
    
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
    this.date = new Date().getDate();
    this.monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'Septemper',
        'October',
        'November',
        'December'
    ];
    
    this.root.querySelector('.prev_month').addEventListener('click',e=>{
        e.preventDefault();        
        //this.month = new Date(this.year,this.month-1).getMonth()        

        let curr_mon = this.month;
        this.month = curr_mon-1 < 0 ? 11 : curr_mon-1;
        this.year =  curr_mon-1 < 0 ? this.year -1 : this.year;

        this.renderCalendar();
    })
    
    this.root.querySelector('.next_month').addEventListener('click',e=>{
        e.preventDefault();
        let curr_mon = this.month;
        this.month = curr_mon+1 > 11 ? 0 : curr_mon+1;
        this.year =  curr_mon+1 > 11 ? this.year +1 : this.year;

        this.renderCalendar();
    })

    this.root.querySelector('.prev_year').addEventListener('click',e=>{
        e.preventDefault();
        this.year--;        
        this.renderCalendar();
    })

    this.root.querySelector('.next_year').addEventListener('click',e=>{
        e.preventDefault();
        this.year++;        
        this.renderCalendar();
    })

    document.addEventListener('mouseup',(e)=>{
        let container = this.root;
        if (!container.contains(e.target)) {
            if (! this.input_ele.contains(e.target)) {
                container.hidden =  true;
            }
            
        }

    });



    document.querySelector('body').append(this.root);  
    this.renderCalendar();
    this.input_ele.addEventListener('focus',()=>{        

        this.root.style.top = `${ this.input_ele.getBoundingClientRect().y + this.input_ele.getBoundingClientRect().height}px`;
        this.root.style.left = `${ this.input_ele.getBoundingClientRect().x + this.input_ele.getBoundingClientRect().width}px`;
        this.root.hidden = false;            
    });



    

  }
   renderCalendar(){


    this.root.querySelector('.title>span').innerHTML = `${this.monthList[this.month]} ${this.year}`;
    var starDay = new Date(this.year,this.month,1).getDay() ;
    var lastDaysofmonth = new Date(this.year,this.month + 1,0).getDate();

    var days_ele = this.root.querySelector('.days');
    days_ele.querySelectorAll('a').forEach(e=>{
        days_ele.removeChild(e);
    });

    for (let index = 0; index < starDay; index++) {
        let ele = document.createElement('a');      
        days_ele.append(ele);
    }

    for (let index = 1; index <= lastDaysofmonth; index++) {
        let ele = document.createElement('a');
        ele.innerText = index;
        ele.className = "calendar-dateitem"
        ele.href= "#";
        ele.addEventListener('click',(e)=>{
            e.preventDefault();
            this.date = ele.innerText;
            this.input_ele.value = `${this.year}-${this.month+1}-${this.date}`
            this.root.hidden = true;
        });
        days_ele.append(ele);
    }        


   }
}