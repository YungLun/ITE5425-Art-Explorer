/***************************************************************************
 * ITE5425 - Mastery Assignment 1: Art Explorer
 * I declare that this assignment is my own work in accordance with Humber
 * Academic Policy. No part of this assignment has been copied manually or
 * electronically from any other source, including websites, or distributed
 * to other students.
 *
 * I understand that I may use Generative AI for learning, debugging, and
 * brainstorming, but the submitted work must be customized to this Art
 * Explorer assignment and I must be able to explain the code and design decisions.
 *
 * Name: Yung-Lun Lee  Student ID: N01721599  Date: 2026.10.21
 ***************************************************************************/

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ArtworkList from "./ArtworkList";
import { searchArtworkIDs, getArtwork } from "@/lib/metApi";

export default function ArtworkBrowser() {
  const searchParams = useSearchParams();

  const queryParam = searchParams.get("q");
  const titleOnly = searchParams.get("title") === "true";

  const initialKeyword = queryParam || "sunflowers";

  const [keyword, setKeyword] = useState(initialKeyword);
  const [searchKeyword, setSearchKeyword] = useState(initialKeyword);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [searchCount, setSearchCount] = useState(0);

  // Keep the input and search keyword in sync with URL changes.
  useEffect(() => {
    setKeyword(initialKeyword);
    setSearchKeyword(initialKeyword);
  }, [initialKeyword]);

  useEffect(() => {
    let cancelled = false;

    async function loadArtworks() {
      setLoading(true);
      setError("");

      try {
        const ids = await searchArtworkIDs(
          searchKeyword,
          titleOnly
        );

        const artworkData = await Promise.all(
          ids.map((id) => getArtwork(id))
        );

        if (!cancelled) {
          setArtworks(artworkData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setArtworks([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadArtworks();

    return () => {
      cancelled = true;
    };
  }, [searchKeyword, titleOnly, searchCount]);

  function handleSearch() {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) {
      setValidationError("Please enter a search keyword.");
      return;
    }

    setValidationError("");
    setSearchKeyword(trimmedKeyword);
    setSearchCount((prev) => prev + 1);
  }

  return (
    <section className="panel">
      <div className="row">
        <input
          className="field"
          aria-label="Artwork keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <button
          className="button"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {titleOnly && (
        <p className="muted">
          Searching artwork titles only
        </p>
      )}

      {validationError && (
        <p className="error">{validationError}</p>
      )}

      {loading && (
        <p className="muted">Loading artworks...</p>
      )}

      {error && (
        <p className="error">Error: {error}</p>
      )}

      {!loading && !error && artworks.length === 0 && (
        <p className="muted">No artworks found.</p>
      )}

      {!loading && !error && artworks.length > 0 && (
        <ArtworkList artworks={artworks} />
      )}
    </section>
  );
}
