import axios from 'axios'
import { convertText } from '@/utils/convert-text'

interface BrasilStateProps {
  name: string
}

export async function getBrasilState() {
  const response = await axios.get('https://brasilapi.com.br/api/ibge/uf/v1')

  return response.data as BrasilStateProps
}

interface BrasilCityProps {
  name: string
  code: string
}

export async function getBrasilCityByState(
  UFCode: string,
): Promise<BrasilCityProps> {
  const response = await axios.get(
    `https://brasilapi.com.br/api/ibge/municipios/v1/${UFCode}`,
  )

  return response.data.map((city) => ({
    name: convertText(city.nome),
    code: city.codigo_ibge,
  }))
}

interface GeoLocationProps {
  address: string
  city: string
  coordinates: {
    longitude: string
    latitude: string
  }
}

export async function getGeoLocationByCEP(
  cep: string,
): Promise<GeoLocationProps> {
  const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`)

  return {
    address: response.data.street,
    city: response.data.city,
    coordinates: {
      latitude: response.data.location.coordinates.latitude,
      longitude: response.data.location.coordinates.longitude,
    },
  }
}
