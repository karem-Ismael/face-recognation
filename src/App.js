import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognation from'./components/FaceRecognation/FaceRecognation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
const app = new Clarifai.App({
  apiKey: 'a589da912e29434e96b0d9e5a13c970b'
 });
 const particleoptions= {
  particles: {
    number:{
      value: 130,
      density:{
        enable:true,
        value_area:630
      }
    }
  }
     
  }

class App extends Component {
  constructor(){
    super()
    this.state={
      input:'',
      imgurl:'',
      box:{},
      route:'signin',
      isSigned:false,
      user:{
        name:'',
        email:'',
        password:'',
        entries:0,
        joined: ''
      }
    }
  }
  loaduser=(data)=>{
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email,
        password:data.password,
        entries:data.entries,
        joined: data.joined
      }
    })
  }

  onRoutechange=(route)=>{
    if(route ==='signout'){
      this.setState({
        isSigned:false
      })
    }else if(route === 'home'){
      this.setState({
        isSigned:true
      })

    }
    this.setState({
      route:route
    })
  }
  onInputchange=(e)=>{
    this.setState({
      input:e.target.value
    })
  }
  calculateFaceRecognation=(data)=>{
    const clarifiFace=data.outputs[0].data.regions[0].region_info.bounding_box
    const image=document.getElementById('imgrecognation')
    const width=Number(image.width)
    const height=Number(image.height)
    return{
      leftcol:clarifiFace.left_col* width,
      toprow:clarifiFace.top_row *height,
      rightcol: width -(clarifiFace.right_col *width),
      bottomrow: height -(clarifiFace.bottom_row *height)
    }
   
  }
  displayFaceBox=(box)=>{
    this.setState({box:box})
  }
  onButtonsubmit=()=>{
    this.setState({
      imgurl:this.state.input,
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if(response) {
        fetch('https://immense-island-60452.herokuapp.com/image',{
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          body:JSON.stringify({
             id:this.state.user.id   
        }),
        headers: {
          'Content-Type': 'application/json'
            }
      }).then(response =>response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        })
      }
     
      this.displayFaceBox(this.calculateFaceRecognation(response))
    })
    .catch(error=>console.log('unable'))
  }
  render(){
    return (
      <div className="App">
        <Particles  className="particles" params={particleoptions} />
        <Navigation isSigned={this.state.isSigned} onRoutechange={this.onRoutechange} />
        { this.state.route ==='home' ? 
        <>
         <Logo />
         <Rank name={this.state.user.name} entries={this.state.user.entries}/>
         <ImageLinkForm onInputchange={this.onInputchange} onButtonsubmit={this.onButtonsubmit}/>
        
        <FaceRecognation box={this.state.box} image={this.state.imgurl}/> 
        </>
        :(
        this.state.route ==='signin' ?  <SignIn loaduser={this.loaduser} onRoutechange={this.onRoutechange} /> 
        : <Register  loaduser={this.loaduser} onRoutechange={this.onRoutechange} />
        )
        
      }

      </div>
    );
  }
  
}
export default App;
