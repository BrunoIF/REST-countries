import { API_URL } from "@constants/api";

export default async function handler(req, res) {
  try {
    const result = await fetch(
      `${API_URL}/all?fields=name,capital,population,flags,region,numericCode`
    );
    const data = await result.json();

    if (!data) {
      res.status(200).json({ data: "not found" });
    }

    const { amount, page, filters } = JSON.parse(req.body);

    let countryData = data;

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
