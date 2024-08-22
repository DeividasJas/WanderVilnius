function PagginationButtons({ setPage, dataLength, limit }) {
  //   console.log(dataLength, limit);
  const pages = [];
  const pageCount =
    dataLength % limit
      ? Math.floor(dataLength / limit) + 1
      : Math.floor(dataLength / limit);

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center m-5">
      <div className='join'>
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={(e) => {
              setPage(parseInt(e.target.textContent));
            }}
            className='join-item btn'
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PagginationButtons;
