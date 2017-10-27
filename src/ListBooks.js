import React, { Component } from 'react'
import startCase from 'lodash.startcase'
import Bookshelf from './Bookshelf'

class ListBooks extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.books.map(book => book.shelf).filter((value, index, self) => self.indexOf(value) === index).map(shelf => (
              <Bookshelf key={shelf} title={startCase(shelf)} books={this.props.books.filter(book => book.shelf === shelf)} />
            ))}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }

}

export default ListBooks