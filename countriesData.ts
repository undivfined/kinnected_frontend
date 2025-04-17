type CountryData = {
  [key: string]: string[];
};

const countryData: CountryData = {
  Belarus: ["Europe/Minsk"],
  UK: ["Europe/London"],
  "South Africa": ["Africa/Johannesburg"],
  "United States": [
    "America/Adak",
    "America/Anchorage",
    "America/Chicago",
    "America/Denver",
    "America/Indiana/Knox",
    "America/Los_Angeles",
  ],
};

export default countryData;
