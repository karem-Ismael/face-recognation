import React ,{Component} from 'react'
   class SignIn extends Component {
       constructor(props){
           super(props)
           this.state={
               email:'',
               password:''
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
   onSubmit=()=>{
       fetch('https://immense-island-60452.herokuapp.com/signin',
       {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body:JSON.stringify({
            email:this.state.email,
            password:this.state.password
        }),
        headers: {
          'Content-Type': 'application/json'
            }
        }).then(response=> response.json())
        .then(user=>{
            if(user[0].id){
                console.log(user[0].id)
                this.props.loaduser(user[0])
                this.props.onRoutechange('home')
            }
        })
   }
       render() {
        const {onRoutechange}=this.props
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
                <main className="pa4 black-80">
                <div className="measure ">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                    <label className="db fw6 lh-copy f6"  htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" onChange={this.onEmailchange} name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" onChange={this.onPasswordchange} name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="">
                    <input  onClick={this.onSubmit}className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                </div>
                <div className="lh-copy mt3">
                    <p  onClick={()=>onRoutechange('register')} className="f6 link dim black db pointer">Register</p>
                </div>
                </div>
             </main>
          </article>
          
        )
          
       }
    
}
export default SignIn
