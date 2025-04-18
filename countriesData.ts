type CountryData = { country: string; timezones: string[] }[];

const countryData: CountryData = [
  { country: "Belarus", timezones: ["Europe/Minsk"] },
  { country: "UK", timezones: ["Europe/London"] },
  { country: "South Africa", timezones: ["Africa/Johannesburg"] },
  {
    country: "United States",
    timezones: [
      "America/Adak",
      "America/Anchorage",
      "America/Chicago",
      "America/Denver",
      "America/Indiana/Knox",
      "America/Los_Angeles",
    ],
  },
];

export default countryData;
