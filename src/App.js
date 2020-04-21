import React, { Component} from 'react';

import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/Search';
import { Alert } from './components/layout/Alert';


class App extends Component {

  state={
    users:[],
    loading:false,
    alert:null
  }
 
  //async componentDidMount() {
//
 //   this.setState({ loading: true });
//    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
 //   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
 //   this.setState({ users: res.data, loading: false });
 // }

searchUsers = async (text) =>
{
 this.setState({loading:true});
 const res=await axios.get(`https://api.github.com/search/users?q=${text}`);
 this.setState({users:res.data.items});
 this.setState({loading:false});
}

clearUsers =()=>{
  this.setState({users:[]});
}

setAlert=(message,type)=>{

  this.setState({alert:{message:message,type:type}});
  setTimeout(()=>this.setState({alert:null}),5000);
}

  render()
  {
    
   
  return (
    <div className="App">

      <Navbar title=' Github Explorer' icon="fab fa-github"></Navbar>
      <Alert alert={this.state.alert}/>
      <div className='container'>
        <Search 
        searchUsers={this.searchUsers}
        clearUsers={this.clearUsers}
        showClear={this.state.users.length>0?true:false}
        setAlert={this.setAlert}/>
      <Users users={this.state.users} loading={this.state.loading}></Users>
      </div>
    
      </div>
  );
  }
}

export default App;
