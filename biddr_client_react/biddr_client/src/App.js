import './App.css';
import React,{useState,useEffect} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Session} from "./data/request";
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import AuthRoute from './components/AuthRoute';
import AuctionIndexPage from './components/AuctionIndexPage';
import NewAuctionPage from './components/NewAuctionPage';
import AuctionShowPage from './components/AuctionShowPage';

function App(props) {
  const [user, setUser] = useState(null)

  const handleSignUp=()=>{
    Session.currentUser().then(user=>{
        setUser(user)
    })
  }
  const handleSubmit=(params)=>{
    Session.create(params).then(()=>{
      return Session.currentUser()}
      ).then(user=>{
        return setUser(user)
      })
  }
  const destroySession=()=>{
    Session.destroy()
    .then(res=>{
        setUser(null)
      })
  }

  useEffect(()=>{
    Session.currentUser()
    .then(user=>{
        setUser(user)
      })
    },[])


  return (
    <div className="App container">

        <BrowserRouter>
        <Navbar  currentUser={user}
                  destroySession={destroySession}
          />  
          <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/auctions' render={(props)=><AuctionIndexPage 
                                      currentUser={user} 
                                      {...props}/>} 
          />
          <AuthRoute path='/auctions/new' isAuth={user} component={NewAuctionPage}/>
          <Route path='/auctions/:id' render={(props)=><AuctionShowPage 
                                  currentUser={user} 
                                  {...props}/>} 
          />
          <Route exact path='/sign_in' render={(routeProps)=><SignInPage 
                                  handleSubmit={handleSubmit} 
                                  currentUser={user}
                                  {...routeProps}/>} 
          />
          <Route exact path='/sign_up' render={(routeProps)=><SignUpPage 
                                  handleSignUp={handleSignUp} 
                                  {...routeProps}/>} 
          />
         
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
