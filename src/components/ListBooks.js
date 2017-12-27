import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import startCase from 'lodash.startcase'
import Bookshelf from './Bookshelf'

const ListBooks = ({ title, books, onChangeShelf }) => {
  const shelves = ["currentlyReading", "wantToRead", "read"]

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{title}</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map(shelf => (
            <Bookshelf key={shelf} title={startCase(shelf)} onChangeShelf={onChangeShelf} books={books.filter(book => book.shelf === shelf)} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  title: PropTypes.string.isRequired,
  onChangeShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default ListBooks