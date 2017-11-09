import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  changeShelf = (book, shelf) => {
    this.setState(state => ({
      books: state.books.map(b => {
        if (b.id === book.id) {
          b.shelf = shelf
        }
        return b
      })
    }))

    BooksAPI.update(book, shelf)
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({ books }))
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks title="MyReads" books={books} onChangeShelf={this.changeShelf} />
        )} />

        <Route path="/search" render={() => (
          <SearchBooks onChangeShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
