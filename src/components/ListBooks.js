import React from 'react'
import startCase from 'lodash.startcase'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'

const ListBooks = (props) => {
  const {title, books, onChangeShelf, onDisplaySearchPage} = props
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>{title}</h1>
      </div>
      <div className="list-books-content">
        <div>
          {books.map(book => book.shelf).filter((value, index, self) => self.indexOf(value) === index).map(shelf => (
            <Bookshelf key={shelf} title={startCase(shelf)} onChangeShelf={onChangeShelf} books={books.filter(book => book.shelf === shelf)} />
          ))}
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => onDisplaySearchPage(true)}>Add a book</a>
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