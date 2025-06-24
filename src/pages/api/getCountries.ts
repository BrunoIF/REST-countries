import { API_URL } from "constants/api";
import { NextApiRequest, NextApiResponse } from "next";

let cachedResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let data;

    if (!cachedResponse) {
      const result = await fetch(
        `${API_URL}/all?fields=name,capital,population,flags,region,cca3`
      );
      data = await result.json();
      cachedResponse = data;
    } else {
      data = cachedResponse;
    }

    if (!data) {
      res.status(500).json({ data: "not found" });
    }

    const { amount, page, filters } = JSON.parse(req.body);

    let countryData = data.sort((a, b) => {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });

    if (filters?.region) {
      countryData = countryData.filter(
        (country) =>
          country.region.toLowerCase() === filters.region.toLowerCase()
      );
    }

    if (filters?.name) {
      countryData = countryData.filter((country) =>
        country.name.common.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    countryData = countryData.slice(amount * (page - 1), amount * page);

    const response = {
      countries: countryData,
      page: page ?? 0,
      limit: data.length,
      amount: amount ?? 0,
    };

    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
