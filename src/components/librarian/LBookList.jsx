import LBookItem from "./LBookItem"

const LBookList = ({ book = [] }) => {
  return (
    <div className="librarian-book-list">
      <LBookItem />
    </div>
  )
}

export default LBookList