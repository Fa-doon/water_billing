const stateDetails = (data) => {
  const result = data.map((entry) => ({
    state: entry.state,
  }));

  return result;
};

const lgaDetails = (data) => {
  const result = data.map((entry) => ({
    lga: entry.lga,
    state_id: entry.state_id,
  }));

  return result;
};

const purposeDetails = (data) => {
  const result = data.map((entry) => ({
    purpose: entry.purpose,
  }));

  return result;
};

module.exports = { stateDetails, lgaDetails, purposeDetails };
