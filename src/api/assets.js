import axios from './axios';

export async function list(irr) {
  try {
    const response = await axios.get('/api/assets', {
      params: {
        irr: irr
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function show(id) {
  try {
    const response = await axios.get('/api/assets/' + id);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createAsset(assetData) {
  try {
    const response = await axios.post('/api/assets',
      assetData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateAsset(assetData) {
  try {
    const response = await axios.put('/api/assets',
      assetData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteAsset(assetData) {
  try {
    const response = await axios.delete('/api/assets',
      { data: assetData });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function updateMovement(movementData) {
  try {
    const response = await axios.put('/api/assets/movement',
      movementData);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function createMovement(movementData) {
  try {
    const response = await axios.post('/api/assets/movement',
      movementData);
    return response;
  } catch (error) {
    throw error;
  }
}


export async function getQuotes() {
  try {
    const response = await axios.get('/quotes');
    return response.data;

  } catch (error) {
    throw error;
  }
}

export async function getQueryQuote(query) {
  try {
    const response = await axios.get('/api/assets/queryquote', {
      params: {
        query: query
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
}


export async function showAssetMovements(assetId) {
  try {
    //console.log()
    const response = await axios.get('/api/assets/' + assetId);
    return response.data;
  } catch (error) {
    throw error;
  }

}


// Index, Show, Create, Delete, Update