import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import CharPage from '../charPage';
import gotServise from '../../servises/gotServise';

import './app.css';

export default class App extends Component {
  gotServise = new gotServise();

  state = {
    showRandomChar: true, //показывается ли блок со случ персонажами
    error: false //показ ли окно с ошибкой
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
    const char = this.state.showRandomChar ? <RandomChar /> : null;

    return (
      <>
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
          <CharPage />
          <Row>
            <Col md='6'>
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotServise.getAllBooks}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md='6'>
              <CharDetails
                charId={this.state.selectedChar} />
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotServise.getAllHouses}
                renderItem={(item) => item.name}
              />
            </Col>
            <Col md='6'>
              <CharDetails
                charId={this.state.selectedChar}
              />
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

