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

import ArtworkCard from "./ArtworkCard";
export default function ArtworkList({artworks}){return <div className="grid">{artworks.length===0?<div className="placeholder">Artwork cards appear here after you connect the API.</div>:artworks.map(artwork=><ArtworkCard key={artwork.objectID} artwork={artwork}/>)}</div>}
