import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './components/SearchBooks'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
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
  }

  displaySearchPage = (event) => {
    this.setState(state => ({
      showSearchPage: event
    }))
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}))
  }

  render() {
    const {books, showSearchPage} = this.state

    return (
      <div className="app">
        {showSearchPage ? (
          <SearchBooks onDisplaySearchPage={this.displaySearchPage} />
        ) : (
            <ListBooks title="MyReads" books={books} onChangeShelf={this.changeShelf} onDisplaySearchPage={this.displaySearchPage} />
          )}
      </div>
    )
  }
}

export default BooksApp
