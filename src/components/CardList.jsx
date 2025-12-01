import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  // Define the limit state variable and set it to 10
  const limit = 10;
  // Define the default dataset, using slice to get the first 10 products
  const defaultDataset = data.slice(0, limit);
  
  // Define the offset state variable and set it to 0
  const [offset, setOffset] = useState(0);
  // Define the products state variable and set it to the default dataset
  const [products, setProducts] = useState(defaultDataset);
  // Keep track of the filtered data
  const [filteredData, setFilteredData] = useState(data);

  // Define the filterTags function
  const filterTags = (searchTerm) => {
    // If search term is empty, reset to all data
    if (!searchTerm || searchTerm === '') {
      setFilteredData(data);
      setOffset(0);
      return;
    }

    // Filter the data by tags
    const filtered = data.filter((product) => {
      // Check if any tag title includes the search term
      return product.tags.some((tag) => 
        tag.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    // Update the filtered data and reset offset
    setFilteredData(filtered);
    setOffset(0);
  };

  // Define a unified pagination handler
  const handlePagination = (direction) => {
    if (direction === 'next') {
      setOffset(offset + limit);
    } else if (direction === 'previous') {
      setOffset(Math.max(0, offset - limit));
    }
  };

  // Define the useEffect hook
  // This hook will run every time the offset, limit, or filteredData state variables change
  // It will update the products state variable to the next 10 products
  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  // Check if we're at the end of the list
  const isAtEnd = offset + limit >= filteredData.length;
  // Check if we're at the beginning
  const isAtStart = offset === 0;

  return (
    <div className="cf pa2">
      {/* Search Component */}
      <Search handleSearch={filterTags} />
      
      <div className="mt2 mb2">
        {/* Using the products state, we map over the list of products and render a Card component for each product */}
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} {...product} />
          ))
        ) : (
          <div className="tc pa4">
            <p className="f4 gray">No products found matching your search.</p>
          </div>
        )}
      </div>
      
      {/* Pagination Buttons */}
      {products.length > 0 && (
        <div className="flex items-center justify-center pa4">
          <Button 
            text="Previous" 
            handleClick={() => handlePagination('previous')}
            disabled={isAtStart}
          />
          <Button 
            text="Next" 
            handleClick={() => handlePagination('next')}
            disabled={isAtEnd}
          />
        </div>
      )}
    </div>
  );
};

export default CardList;