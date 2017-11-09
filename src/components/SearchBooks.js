import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    searchResults: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query })

    BooksAPI.search(this.state.query, 20).then(books => this.setState({ searchResults: books }))
  }

  render() {
    const { onChangeShelf, onDisplaySearchPage } = this.props
    const { query, searchResults } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onDisplaySearchPage(false)}>Close</a>
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
            {searchResults.map(book => (
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