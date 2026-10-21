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

import Link from "next/link";

export default function ArtworkCard({ artwork }) {
  return (
    <article className="card">
      <h3>{artwork.title || "Untitled"}</h3>

      <p>{artwork.artistDisplayName || "Unknown Artist"}</p>

      <p>Date: {artwork.objectDate || "Unknown Date"}</p>

      {artwork.primaryImageSmall ? (
        <img
            src={artwork.primaryImageSmall}
            alt={artwork.title || "Artwork image"}
            className="artwork-image"
        />
        ) : (
        <div className="placeholder">
            No image available
        </div>
        )}

      <Link href={`/artwork/${artwork.objectID}`}>
        View Details
      </Link>
    </article>
  );
}