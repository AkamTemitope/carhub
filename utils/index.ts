import { CarProps, FilterProps } from "@/types";
import { createClient } from "pexels";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel, limit } = filters;

  const headers = {
    "X-RapidAPI-Key": `${process.env.NEXT_PUBLIC_RAPID_API_KEY}`,
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com"
  };
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&year=${year}&fuel_type=${fuel}&limit=${limit}`;

  try {
    const response = await fetch(url, { headers });
    const result = await response.json();

    let obj: Record<string, CarProps> = {};
    result.map((item: any) => (obj[`${item.make + item.model}`] = item));

    let uniqueResults = Object.values(obj);

    return uniqueResults;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getImageUrls = async (query: string, limit: number = 1) => {
  const imageUrls = await pixabayImages(query, limit);
  return imageUrls;
};

// https://pixabay.com/api/docs/
const pixabayImages = async (query: string, limit: number = 1) => {
  const url = new URL("https://pixabay.com/api/");

  url.searchParams.append(
    "key",
    process.env.NEXT_PUBLIC_PIXABAY_API_KEY as string
  );
  url.searchParams.append("q", query.replaceAll(" ", "+"));
  url.searchParams.append("image_type", "photo");
  url.searchParams.append("pretty", "true");
  url.searchParams.append("category", "transportation");
  url.searchParams.append("per_page", `${limit > 3 ? limit : 3}`);

  try {
    const response = await fetch(url);
    const data = await response.json();
    const images = data?.hits.map((item: any) => item.largeImageURL);

    return images;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// pexels
const pexelsImages = async (query: string, limit: number = 1) => {
  const client = createClient(`${process.env.NEXT_PUBLIC_PEXELS_API_KEY}`);

  try {
    const response = await client.photos.search({ query, per_page: limit });
    let photoUrls = [""];
    if ("photos" in response) {
      const photos = response?.photos;
      photoUrls = photos.map((photo) => photo.src.landscape);
    }
    return photoUrls;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// imagin.studio
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append(
    "customer",
    process.env.NEXT_PUBLIC_IMAGIN_API_KEY || ""
  );
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return `${url}`;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathName = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathName;
};

export const deleteSearchParams = (type: string) => {
  // Set the specified search parameter to the given value
  const newSearchParams = new URLSearchParams(window.location.search);

  // Delete the specified search parameter
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construct the updated URL pathname with the deleted search parameter
  const newPathname = `${
    window.location.pathname
  }?${newSearchParams.toString()}`;

  return newPathname;
};
