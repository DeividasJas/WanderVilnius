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
    <>
      {/* <Pagination
        count={
          data.length % limit
            ? Math.floor(data.length / limit) + 1
            : Math.floor(data.length / limit)
        }
        color='primary'
        onChange={(e, value) => setPage(value)}
      /> */}

      <div className='join'>
        {/* <button className='join-item btn'>1</button>
        <button className='join-item btn btn-active'>2</button>
        <button className='join-item btn'>3</button>
        <button className='join-item btn'>4</button> */}
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
    </>
  );
}

export default PagginationButtons;
