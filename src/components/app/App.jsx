import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages';
import gotServise from '../../servises/gotServise';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './app.css';

export default class App extends Component {
  gotServise = new gotServise();

  state = {
    showRandomChar: true, //показывается ли блок со случ персонажами
    error: false, //показ ли окно с ошибкой
    selectedHouse: 20
  }

  componentDidCatch() { //в случае ошибки
    this.setState({
      error: true //добавляем в стейт ошибку
    })
  }

  toggleRandomChar = () => { //переключить окно со случ персонажем
    this.setState((state) => { //установить новое состояние
      return {
        showRandomChar: !state.showRandomChar //новое сост будет обратно текущ
      }
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />
    }
    const char = this.state.showRandomChar ? <RandomChar interval = {1500}/> : null;

    return (
      <Router><div className='app'>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {char}
              <Button
                className="toggle-btn"
                onClick={this.toggleRandomChar}>
                Toggle random Character
              </Button>
            </Col>
          </Row>
          <Route path='/' exact component={() => <h1>welcome to GOT data-base</h1>} />
          <Route path='/characters' component={CharacterPage} />
          <Route path='/houses' component={HousesPage} />
          <Route path='/books' exact component={BooksPage} />
          <Route path='/books/:id' render={
            ({ match }) => {
              //console.log(match) //как патч овпал с текущ адресом, хранит айди
              //console.log(location) //состояние и положение роутера в текущ момент
              //console.log(history) //для организации апи для перехода между стр
              const { id } = match.params;
              return <BooksItem
                bookID={id} /> /* делает запрос к сервису, и вместо стейта использовал айди */
            }
          } />
        </Container>
      </div></Router>



    )
  }
}

