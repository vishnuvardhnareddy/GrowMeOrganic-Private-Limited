import { useEffect, useState } from "react";

export interface Artwork {
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
}

const useArtworkData = () => {
  const [data, setData] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = "https://api.artic.edu/api/v1/artworks?page=1";
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data); // Log the data array to check field names
        if (result && result.data) {
          const mappedData = result.data.map((item: any) => ({
            title: item.title,
            place_of_origin: item.place_of_origin, // Ensure this field is correctly named
            artist_display: item.artist_display,
            inscriptions: item.inscriptions,
            date_start: item.date_start,
            date_end: item.date_end,
          }));
          setData(mappedData);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading };
};

export default useArtworkData;
