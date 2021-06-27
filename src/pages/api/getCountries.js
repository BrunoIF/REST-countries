export default async function handler(req, res) {
  try {
    const result = await fetch(
      "https://restcountries.eu/rest/v2/all?filter=name;capital;population;flag;region;numericCode"
    );
    const data = await result.json();

    if (!data) {
      res.status(200).json({ data: "not found" });
    }

    const { amount, page } = JSON.parse(req.body);

    const countryData = data.slice(amount * page - 1, amount * page);

    const response = {
      countries: countryData,
      page: page ?? 0,
      total: data.length,
      amount: amount ?? 0,
    };

    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}