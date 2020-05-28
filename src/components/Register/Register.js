import React ,{Component} from 'react'
   class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            name:''
        }
    }
    onEmailchange=(e)=>{
         this.setState({
             email:e.target.value
         })
    }
    onPasswordchange=(e)=>{
     this.setState({
         password:e.target.value
     })
}
onNamechange=(e)=>{
    this.setState({
        name:e.target.value
    })
 }
onSubmit=()=>{
    fetch('https://immense-island-60452.herokuapp.com/register',
    {
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
     body:JSON.stringify({
         email:this.state.email,
         password:this.state.password,
         name:this.state.name
     }),
     headers: {
       'Content-Type': 'application/json'
         }
     }).then(response=> response.json())
     .then(user=>{
         if(user){
             this.props.loaduser(user)
             this.props.onRoutechange('home')

         }
     })
}
       render(){
        const {onRoutechange}=this.props

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                    <main className="pa4 black-80">
                    <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f3 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6"  htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onNamechange} type="text" name="name"  id="name" />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6"  htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onEmailchange} type="email" name="email-address"  id="email-address" />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6"  htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onPasswordchange} type="password" name="password"  id="password" />
                        </div>
                    </fieldset>
                    <div className="">
                        <input  onClick={this.onSubmit}className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                    </div>
                    
                    </div>
                </main>
              </article>
              
            )
       }
    
}
export default Register
