import React, { Component } from "react";
import qs from 'qs';

class Login extends Component {
componentDidMount(){
  //const bp= 'http://127.0.0.1:4433';
  const bp= 'http://35.197.227.48:4433';
  if (this.props.location.search){
    const fid = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).flow;
    console.log(fid);
    const headers1 = {
      Accept: 'application/json',
    //  credentials: 'include' 
    }
    fetch(bp+"/self-service/login/flows?id="+fid, {
      method: 'GET',
      headers1
    })
      .then((r1) => r1.json())
      .then((res1) => {
        console.log(res1)
        const  csrf_token=res1.methods.password.config.fields[2].value;
        const action = res1.methods.password.config.action;
        const _input = {
          csrf_token,
          identifier: "newadmin",
          password: "Abcc@1234567"
        };
        const headers2 = {
          "Accept": "application/json",
          //"Content-Type": "application/json"
          "Content-Type": "application/x-www-form-urlencoded"
          
        //  credentials: 'include' 
        }
        const payload = JSON.stringify(_input);
        fetch(action, {
          body:payload,
          method: 'POST',
          headers2
        })
          //.then((r2) => r2.json())
          .then((res2) => {
            console.log(res2);
          }).catch(ex=>console.log(ex))
      }).catch(ex=>console.log(ex))
}
}
  render() {
    return (
      <React.Fragment>
        <div style={{ textAlign: "center",marginTop:'10rem' }}>
          <h1>Login Page</h1>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
