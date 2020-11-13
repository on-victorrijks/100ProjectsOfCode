import './css/slide.css';
import React, { Component } from "react";

class Slide extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      dataName: "",
      slideData: ""
    };
  }
  fetchSlideData() {
    var url = "http://localhost:9000/api/product/"+this.state.dataName;
    console.log(url);
    fetch(url)
        .then(res => res.text())
        .then(res => this.setState({ slideData: JSON.parse(res) }));
  }


  componentWillMount() {
    if(this.props !== undefined){
      this.setState({
        dataName: this.props.custom_dataName
      }, () => {
        this.fetchSlideData();
      });
    }
  }

  parseText = (data) => {
    var splittedTxt = data["text"].split('/');
    console.log(splittedTxt);

    return (
      <h1 className={"title " + data["style"]}>
        {splittedTxt.map((value, index) => {
          return <e style={{color:data["colors"][index]}} key={index}>{value}</e>
        })}
      </h1>
    );
  }

  

  render() {
    return (
      <div className="Slide">
      {this.state.slideData["title"] !== undefined &&
        <div className="SlideInner" style={{background: this.state.slideData["bgColor"]}}>
          <div className={"backgroundImage " + this.state.slideData["image"]["style"]} style={{backgroundImage: 'url("/assets/'+this.state.slideData["image"]["url"]+'")'}}/>
          {this.state.slideData["descType"] === 'stat' &&
          <div className="content stat" style={{color: this.state.slideData["textColor"], borderColor: this.state.slideData["textColor"]}}>
            <div className="leftPart">  
              {this.parseText(this.state.slideData["title"])}
              <div className={"linkContainer " + this.state.slideData["link"]["style"]}>
                <a className={"link " + this.state.slideData["link"]["style"]} href={this.state.slideData["link"]["href"]}>
                  {this.state.slideData["link"]["title"]}
                  <i class="arrow right"></i>
                </a>
              </div>
            </div>
            <div className="rightPart">
              <div className="statContainer">
                <h4 className="top">{this.state.slideData["desc"]["text"][0]}</h4>
                <h2 className="mid">{this.state.slideData["desc"]["text"][1]}</h2>
                <h4 className="bot">{this.state.slideData["desc"]["text"][2]}</h4>
              </div>
            </div>
          </div>
          }
          {this.state.slideData["descType"] === 'explication' &&
          <div className="content" style={{color: this.state.slideData["textColor"], borderColor: this.state.slideData["textColor"]}}>
            {this.parseText(this.state.slideData["title"])}
            <h3 className={"description " + this.state.slideData["desc"]["style"]}>{this.state.slideData["desc"]["text"]}</h3>
            <div className={"linkContainer " + this.state.slideData["link"]["style"]}>
              <a className={"link " + this.state.slideData["link"]["style"]} href={this.state.slideData["link"]["href"]}>
                {this.state.slideData["link"]["title"]}
                <i class="arrow right"></i>
              </a>
            </div>
          </div>
          }
          {this.state.slideData["descType"] === 'gallery' &&
          <div className="content gallery" style={{color: this.state.slideData["textColor"], borderColor: this.state.slideData["textColor"]}}>
            {this.parseText(this.state.slideData["title"])}

            <div className="galleryContainer">
            {this.state.slideData["galleryContent"].map((elm, index) => {
              return <div className="sld">
                <div className="leftPart">
                  <img src={"/assets/"+elm["url"]}/>
                </div>
                <div className="rightPart">
                  <h1 className="title left medium">{elm["title"]}</h1>
                  <h4 className="description left medium grey thin">{elm["description"]}</h4>
                </div>
              </div>
            })}
            </div>

            <div className={"linkContainer " + this.state.slideData["link"]["style"]}>
              <a className={"link " + this.state.slideData["link"]["style"]} href={this.state.slideData["link"]["href"]}>
                {this.state.slideData["link"]["title"]}
                <i class="arrow right"></i>
              </a>
            </div>
          </div>
          }
        </div>
      }
      </div>
    )
  };
  
}

export default Slide;
