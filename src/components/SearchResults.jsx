'use client';
import React, { useEffect } from "react";

const SearchResults = ({ results, isLoading, loadMore, hasMore, hasSearched }) => {
  const formatZipCode = (zipCode) => {
    if (zipCode && zipCode.length === 9) {
      return `${zipCode.slice(0, 5)}-${zipCode.slice(5)}`;
    }
    return zipCode;
  };

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "N/A";
    const cleaned = phoneNumber.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)})-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phoneNumber;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        hasMore &&
        !isLoading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadMore]);

  if (isLoading && results.length === 0) {
    return <p className="text-center text-gray-600">Loading results...</p>;
  }

  if (hasSearched && results.length === 0 && !isLoading) {
    return (
      <div className="text-center mt-6">
        <p className="text-xl font-semibold text-gray-700">
          No results found. Try adjusting your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-8 px-4 py-6 font-sans">
      {results && results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result, index) => (
            <div key={index} className="bg-white border rounded-lg shadow-md space-y-4 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 duration-500">

              {/* Name and Credential */}
              <div className="bg-cyan-700 p-3 rounded-t-lg text-white">
                <h4 className="text-xl font-semibold">
                  {result.basic.first_name} {result.basic.last_name}{" "}
                  <span className="font-bold text-sm">{result.basic.credential}</span>
                </h4>
              </div>

              {/* Previous Names */}
              {result.other_names && Array.isArray(result.other_names) && result.other_names.length > 0 && (
                <div className="text-gray-600 mt-3 px-4 text-lg">
                  <p className="font-semibold">Previous Names:</p>
                  {result.other_names.map((name, idx) => (
                    <p key={idx}>
                      {name.first_name} {name.last_name} ({name.type})
                    </p>
                  ))}
                </div>
              )}

              {/* Gender */}
              <p className="text-gray-700 text-lg px-4">Gender: {result.basic.gender || "N/A"}</p>

              {/* Taxonomy */}
              {result.taxonomies && result.taxonomies.length > 0 && (
                <p className="text-gray-700 text-lg px-4">Provider Type: {result.taxonomies[0].desc || "N/A"}</p>
              )}

              {/* Phone Numbers */}
              {result.addresses.length > 0 && (
                <p className="text-gray-700 text-lg px-4">
                  Phone Number: {formatPhoneNumber(result.addresses[0].telephone_number)}
                </p>
              )}

              {/* Addresses */}
              {result.addresses.length > 0 && (
                <div className="mt-2 px-4 pb-4">
                    <strong><h5 className="font-semibold text-gray-800">Address:</h5></strong>
                    <div>{result.addresses[0].address_1}</div>
                    <div>
                        {result.addresses[0].city}, {result.addresses[0].state} {formatZipCode(result.addresses[0].postal_code)}
                    </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {isLoading && <p className="text-center text-gray-600 mt-4">Loading more...</p>}
    </div>
  );
};

export default SearchResults;
