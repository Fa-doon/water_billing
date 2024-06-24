const lgaDetails = (data) => {
  const result = data.map((entry) => ({
    lga: entry.lga,
    state_id: entry.state_id,
  }));

  return result;
};

const townDetails = (data) => {
  const result = data.map((entry) => ({
    town: entry.city,
    lga_id: entry.lga_id,
  }));

  return result;
};

module.exports = { lgaDetails, townDetails };
