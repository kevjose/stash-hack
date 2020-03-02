import React from 'react';
import '../App.css';

export const Table = props => {
  const [searchResults, setSearchResults] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    let results = [];
    if (!searchTerm) {
      results = props.ramens;
    } else {
      results = props.ramens.filter(ramen =>
        ramen.Brand.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    }
    setSearchResults(results);
  }, [searchTerm]);

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleClick(e) {
    if (e.target.tagName.toLowerCase() === 'button') {
      const currentAriaChecked =
        e.target.getAttribute('aria-selected') === 'true';

      let target = e.target.nextSibling;
      while (target && target.tagName.toLowerCase() !== 'button') {
        if (currentAriaChecked && target.classList.contains('Rtable-cell')) {
          target.classList.add('hiddenSmall');
        } else {
          target.classList.remove('hiddenSmall');
        }
        target = target.nextSibling;
      }

      e.target.setAttribute('aria-selected', !currentAriaChecked);
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search your favorite Ramen brand"
        onChange={handleChange}
        value={searchTerm}
      />
      <div
        className="Rtable Rtable--6cols Rtable--collapse js-RtableAccordions"
        onClick={handleClick}
      >
        <div className={`Rtable-cell  Rtable-cell--head hiddenSmall`}>
          Brand
        </div>
        <div className={`Rtable-cell  Rtable-cell--head hiddenSmall`}>
          Variety
        </div>
        <div className={`Rtable-cell  Rtable-cell--head hiddenSmall`}>
          Style
        </div>
        <div className={`Rtable-cell  Rtable-cell--head hiddenSmall`}>
          Country
        </div>
        <div className={`Rtable-cell  Rtable-cell--head hiddenSmall`}>
          Stars
        </div>
        <div className={`Rtable-cell  Rtable-cell--head hiddenSmall`}>
          Top Ten
        </div>
        {searchResults && searchResults.length === 0 && (
          <div>
            <br />
            <h3>No results found! &nbsp;</h3>
          </div>
        )}
        {searchResults &&
          searchResults.length &&
          searchResults.map((ramen, i) => {
            return (
              <React.Fragment key={ramen.Brand + ramen['Top Ten']}>
                <button
                  className="Accordion"
                  role="tab"
                  aria-selected={i === 0 ? true : false}
                >
                  {ramen.Brand + ', ' + ramen['Top Ten']}
                </button>

                <div
                  className={`Rtable-cell  Rtable-cell--head ${
                    i === 0 ? '' : 'hiddenSmall'
                  }`}
                >
                  <h3>{ramen.Brand}</h3>
                </div>
                <div className={`Rtable-cell ${i === 0 ? '' : 'hiddenSmall'} `}>
                  {ramen.Variety}
                </div>
                <div className={`Rtable-cell ${i === 0 ? '' : 'hiddenSmall'}`}>
                  {ramen.Style}
                </div>
                <div className={`Rtable-cell ${i === 0 ? '' : 'hiddenSmall'}`}>
                  {ramen.Country}
                </div>
                <div className={`Rtable-cell ${i === 0 ? '' : 'hiddenSmall'}`}>
                  {ramen.Stars}
                </div>
                <div className={`Rtable-cell ${i === 0 ? '' : 'hiddenSmall'}`}>
                  {ramen['Top Ten']}
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default Table;
