import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    searchResults: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query })

    this.search(query)
  }

  search = (query) => {
    const myReads = this.props.books

    BooksAPI.search(query, 20).then(books => this.setState({
      searchResults: books.map(book => {
        let myRead = myReads.find(myRead => myRead.id === book.id)
        return myRead ? myRead : book
      })
    }))
  }

  componentDidMount() {
    this.search = debounce(this.search, 250)
  }

  render() {
    const onChangeShelf = this.props.onChangeShelf
    const { searchResults, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
            <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults && searchResults.map(book => (
              <li key={book.id}>
                <Book book={book} onChangeShelf={onChangeShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )

  }

}

export default SearchBooks