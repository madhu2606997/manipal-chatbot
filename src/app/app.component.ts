import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'chatbot';
  Mainmsg = []
  Usermsg = []
  Allmsg = []
  input = new FormControl('')
 
msgInput = new FormGroup({
  inputMsg: new FormControl('', Validators.required),

});
  constructor(private chat:ChatService){

  }
ngOnInit(){
  this.chat.getIntent('hi').subscribe(res=>{
      console.log(res)
      this.Mainmsg.push(res);
      res['type'] = 'bot'
      this.Allmsg.push(res);
  }) 

}

getMsg(val) {
  // console.log(val)
  // console.log('from parent');
    this.Usermsg.push(val)
    let t = {
        msg :val,
        'type':'user'
    }
   
    this.Allmsg.push(t);
  this.chat.getIntent(val).subscribe(res=>{
    console.log(res);
    this.Mainmsg.push(res);
    res['type'] = 'bot'
    this.Allmsg.push(res);
  })


}


sendMsg(){
  let msg = this.msgInput.value.inputMsg;
  let t = {
      msg :msg,
      'type':'user'
  }
 
  this.Allmsg.push(t);
  this.chat.getIntent(msg).subscribe(res=>{
    console.log(res);
    this.Mainmsg.push(res);
    res['type'] = 'bot'
      this.Allmsg.push(res);
      this.msgInput.reset();
  })
}

}
