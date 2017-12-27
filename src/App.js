import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    myReads: []
  }

  changeShelf = (book, shelf) => {
    if (book.shelf === shelf) return

    book.shelf = shelf
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => {
        myReads: state.myReads.filter(myRead => myRead.id !== book.id).concat(book)
      })
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ myReads: books }))
  }

  render() {
    const { myReads } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks title="MyReads" books={myReads} onChangeShelf={this.changeShelf} />
        )} />

        <Route path="/search" render={() => (
          <SearchBooks books={myReads} onChangeShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
