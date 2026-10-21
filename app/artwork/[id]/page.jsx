
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


import { getArtwork } from "@/lib/metApi";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArtworkDetailPage({ params }) {
  const { id } = await params;

  // Check whether the ID is valid.
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  let artwork;

  try {
    artwork = await getArtwork(id);
  } catch (error) {
    if (error.status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <main className="panel">
      <h1>Artwork Details</h1>
      <p>Artwork ID: {id}</p>

      <h2>{artwork.title || "Untitled"}</h2>

      <p>
        Artist: {artwork.artistDisplayName || "Unknown Artist"}
      </p>

      <p>
        Date: {artwork.objectDate || "Unknown Date"}
      </p>

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

      <p>
        <Link href="/artwork">← Back to Artworks</Link>
      </p>
    </main>
  );
}
