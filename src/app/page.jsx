'use client';
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import SearchResults from "@/components/SearchResults";
import ScrollToTop from "@/components/ScrollToTop";
import { taxonomyData } from "./api/taxonomyData";

const Home = () => {
  const [results, setResults] = useState([]);
  const [skipCount, setSkipCount] = useState(0); // Keeps track of how many records have been skipped
  const [searchParams, setSearchParams] = useState(null); // Store the current search parameters
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To determine if there are more results to load
  const [hasSearched, setHasSearched] = useState(false); // To check if first call has occurred

  const fetchNpiData = async (formData) => {
    setIsLoading(true);
    setSearchParams(formData); // Save the search parameters
    setSkipCount(0); // Reset skip count for a new search
    setHasMore(true); // Reset hasMore for a new search
    setHasSearched(true);

    const response = await fetch(
      `/api/npi?last_name=${formData.lastName}&first_name=${formData.firstName}&city=${formData.city}&state=${formData.state}&limit=48&skip=0&taxonomy_description=${formData.classification}`
    );

    const data = await response.json();

    setResults(data.results || []);
    setHasMore(data.results.length === 48); // If fewer than 48 results are returned, no more results are available
    setSkipCount(48);
    setIsLoading(false);
  };

  const loadMoreData = async () => {
    if (!searchParams || isLoading || !hasMore) return; // Ensure valid params, not loading, and has more to load
    setIsLoading(true);

    const response = await fetch(
      `/api/npi?last_name=${searchParams.lastName}&first_name=${searchParams.firstName}&city=${searchParams.city}&state=${searchParams.state}&limit=48&skip=${skipCount}&taxonomy_description${searchParams.classification}`
    );
    const data = await response.json();

    setResults((prevResults) => [...prevResults, ...(data.results || [])]);
    setHasMore(data.results.length === 48); // Check if there are more results to load
    setSkipCount(skipCount + 48);
    setIsLoading(false);
  };

  return (
    <main className="main">
      <Navbar />
      <SearchBar 
        onSearch={fetchNpiData} 
        classifications={taxonomyData.uniqueClassifications}
      />
      <SearchResults
        results={results}
        isLoading={isLoading}
        loadMore={loadMoreData}
        hasMore={hasMore}
        hasSearched={hasSearched}
        classifications={taxonomyData.uniqueClassifications}
      />
      <ScrollToTop />
    </main>
  );
};

export default Home;
