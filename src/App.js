import React, {Component} from 'react';
import './App.css';
import Nav from "./components/Nav";
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";

class App extends Component {
  //초기화 담당
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:"create",
      selected_content_id:2,
      subject:{title:"WEB", sub:"World Wide Web!"},
      welcome:{title:"Welcome", desc:"Hello, React!!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }

  render() {
    console.log('App render');
    var _title, _desc, _article = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if (this.state.mode === 'create'){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        
        // push는 오리지널 데이터를 바꾼다.
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        
        //concat은 오리지날 데이터를 바꾸지 않고 추가하는 방법으로 새로운 값을 정의해주어야 데이터 추가된 값을 얻을 수 있다.
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        //Array from 방법, 배열에만 사용가능, 객체는 Array asign
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        
        this.setState({
          //push
          //contents:this.state.contents
          
          //concat
          //contents:_contents

          //array push
          contents:newContents
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    }
    return (
      <div className="App">
       <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
          this.setState({mode:'welcome'});
        }.bind(this)}
        >
       </Subject>
       <Nav 
        onChangePage={function(id){
        this.setState({
          mode:'read',
          selected_content_id:Number(id)
        });
       }.bind(this)}
       data={this.state.contents}
       ></Nav>
       <Control onChangeMode={function(_mode){
         this.setState({
           mode:_mode
         })
       }.bind(this)}></Control>
       {_article}
      </div>
    );
  }  
}

export default App;
