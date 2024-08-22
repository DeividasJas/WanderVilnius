function Sort_limit_order({ setSortTour, setOrder, setLimit }) {
  return (
    <>
      <div className='flex gap-1'>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn'>
            Order By
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
          >
            <li className='disabled'>Order By</li>
            <li>
              <a
                onClick={(e) => {
                  setOrder('ASC');
                }}
              >
                Ascending
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  setOrder('DESC');
                }}
              >
                Descending
              </a>
            </li>
          </ul>
        </div>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn'>
            Sort By
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
          >
            <li className='disabled'>Sort By</li>
            <li>
              <a
                onClick={(e) => {
                  setSortTour(e.target.textContent);
                }}
              >
                Name
              </a>
            </li>
            <li>
              <a>Rating</a>
            </li>
          </ul>
        </div>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn'>
            Limit
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
          >
            <li className='disabled'>Show per page</li>
            <li>
              <a
                onClick={(e) => {
                  setLimit(parseInt(e.target.textContent));
                }}
              >
                2
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  setLimit(parseInt(e.target.textContent));
                }}
              >
                5
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  setLimit(parseInt(e.target.textContent));
                }}
              >
                10
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  setLimit(parseInt(e.target.textContent));
                }}
              >
                20
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sort_limit_order;
