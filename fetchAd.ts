import axios from 'axios';

export interface AdResponseType {
  code: number;
  msg: string;
  result: {
    unit: string;
    format: string;
    w: number;
    h: number;
    creativeId: string;
    ad: string;
  };
}

type LocaleCodeType = `${Lowercase<string>}_${Uppercase<string>}`;

interface fetchADParamsType {
  unit_id: string;
  user_id?: string;
  pf?: 'android' | 'ios' | 'web';
  lcl?: LocaleCodeType;
}

export async function fetchAd({
  unit_id,
  user_id,
  pf = 'web',
  lcl = 'ko_KR',
}: fetchADParamsType): Promise<AdResponseType> {
  try {
    const response = await axios.get<AdResponseType>(
      `https://api-v2.adrop.io/request?unit=${unit_id}&pf=${pf}&lcl=${lcl}${
        user_id ? `&uid=${user_id}` : ''
      }`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch ad');
  }
}
