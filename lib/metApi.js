
export async function getArtwork(id) {
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
  );

  if (response.status === 404) {
    const error = new Error("Artwork not found");
    error.status = 404;
    throw error;
  }

  if (!response.ok) {
    throw new Error("Could not load artwork");
  }

  return response.json();
}

export async function searchArtworkIDs(keyword, titleOnly = false) {
  const params = new URLSearchParams({
    q: keyword,
    limit: "6",
  });

  if (titleOnly) {
    params.set("title", "true");
  }

  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1.1/search?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Could not search artworks");
  }

  const data = await response.json();

  return data.objectIDs || [];
}
